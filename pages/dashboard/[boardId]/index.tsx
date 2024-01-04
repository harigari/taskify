import sender from "@/apis/sender";
import Button from "@/components/Buttons/Button/Button";
import ChipPlus from "@/components/Chips/ChipPlus/ChipPlus";
import { Column } from "@/components/Column/Column";
import Input from "@/components/Input/Input";
import InputWrapper from "@/components/Input/InputWrapper";
import MenuLayout from "@/components/menulayout/MenuLayout";
import useApi from "@/hooks/useApi";
import useInputController from "@/hooks/useInputController";
import stylesFromSingle from "@/modals/Modal.module.css";
import ModalWrapper from "@/modals/ModalWrapper";
import ModalButton from "@/modals/components/ModalButton/ModalButton";
import { ColumnData } from "@/types/api.type";
import { getAccessTokenFromCookie } from "@/utils/getAccessToken";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { FormEvent, useEffect, useState } from "react";
import style from "./dashboard.module.css";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const accessToken = getAccessTokenFromCookie(context) as string;

  const {
    data: { dashboards },
  } = await sender.get({ path: "dashboards", method: "pagination", size: 13, accessToken: accessToken });

  const boardId = context.query["boardId"];

  const {
    data: { data: columnData },
  } = await sender.get({ path: "columns", id: Number(boardId), accessToken });

  const {
    data: { members: assigneeList },
  } = await sender.get({ path: "members", id: Number(boardId), accessToken });

  if (!accessToken) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  return {
    props: { accessToken, columnData, assigneeList, boardId, dashboards },
  };
};

const Dashboard = ({
  accessToken,
  columnData,
  assigneeList,
  boardId,
  dashboards,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [columnList, setColumnList] = useState<ColumnData[]>(columnData);
  const [isCreateModal, setIsCreateModal] = useState(false);

  const handleCreateNewColumnModalToggle = () => {
    setIsCreateModal((prevValue) => !prevValue);
  };
  const createModal = useInputController({
    inputConfig: { id: "createModal" },
    labelConfig: { labelName: "이름" },
  });

  const { pending, wrappedFunction } = useApi("post");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await wrappedFunction({
      path: "column",
      data: {
        title: createModal.input.value,
        dashboardId: Number(boardId),
      },
      accessToken,
    });

    if (res?.status === 201) {
      createModal.input.setValue("");
      handleCreateNewColumnModalToggle();
      setColumnList((prevValue) => [...prevValue, res.data]);
    }
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setColumnList(columnData);
  }, [columnData]);

  if (!mounted) return null;

  return (
    <>
      {/* 대시보드에 맞는 레이아웃으로 설정-헤더 수정 */}
      <MenuLayout dashboardList={dashboards}>
        <div className={style.layoutContainer}>
          <div className={style.columnContainer}>
            {columnList.map((column) => (
              <Column
                setColumnList={setColumnList}
                accessToken={accessToken}
                columnId={column.id}
                assigneeList={assigneeList}
                title={column.title}
                dashboardId={column.dashboardId}
                key={column.id}
              />
            ))}
          </div>
          <div className={style.buttonWrapper}>
            <Button buttonType="add_column" color="white" onClick={handleCreateNewColumnModalToggle}>
              <div className={style.buttonContentWrapper}>
                <span>새로운 컬럼 추가하기</span>
                <ChipPlus size="lg"></ChipPlus>
              </div>
            </Button>
          </div>
        </div>
      </MenuLayout>

      {isCreateModal && (
        <ModalWrapper handleModalClose={handleCreateNewColumnModalToggle} size="md">
          <form className={stylesFromSingle.form} onSubmit={handleSubmit} noValidate>
            <div className={stylesFromSingle.modal}>
              <div className={stylesFromSingle.modalTitle}>새 컬럼 생성</div>

              <InputWrapper {...createModal.wrapper}>
                <Input {...createModal.input} />
              </InputWrapper>
            </div>

            <ModalButton.DoubleButton
              disabled={pending || !createModal.input.value}
              onClick={handleCreateNewColumnModalToggle}
            >
              생성
            </ModalButton.DoubleButton>
          </form>
        </ModalWrapper>
      )}
    </>
  );
};

export default Dashboard;
