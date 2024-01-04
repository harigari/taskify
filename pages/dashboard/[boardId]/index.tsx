import sender from "@/apis/sender";
import Button from "@/components/Buttons/Button/Button";
import RedoButton from "@/components/Buttons/RedoButton/RedoButton";
import ChipPlus from "@/components/Chips/ChipPlus/ChipPlus";
import { Column } from "@/components/Column/Column";
import Input from "@/components/Input/Input";
import InputWrapper from "@/components/Input/InputWrapper";
import MenuLayout from "@/components/MenuLayout/MenuLayout";
import useApi from "@/hooks/useApi";
import useInputController from "@/hooks/useInputController";
import stylesFromSingle from "@/modals/Modal.module.css";
import ModalWrapper from "@/modals/ModalWrapper";
import ModalButton from "@/modals/components/ModalButton/ModalButton";
import { EntireData } from "@/types/api.type";
import { getAccessTokenFromCookie } from "@/utils/getAccessToken";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useEffect, useState } from "react";
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

  const entireData: EntireData = {
    cards: {},
    columns: {},
    columnOrder: [],
  };

  for (const value of columnData) {
    entireData.columnOrder.push(value.id);
    entireData.columns[value.id] = value;
  }

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
    props: { accessToken, assigneeList, boardId, dashboards, entireData },
  };
};

const Dashboard = ({
  accessToken,
  assigneeList,
  boardId,
  dashboards,
  entireData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [entireList, setEntireList] = useState(entireData);
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
      setEntireList((prev) => ({
        ...prev,
        columns: { ...prev.columns, [res.data.id]: res.data },
        columnOrder: [...prev.columnOrder, res.data.id],
      }));
    }
  };

  const [mount, setMount] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMount(true);
    //boardId 바뀔 때, 화면에 보이는 데이터 전환
    setEntireList(entireData);
  }, [router.query.boardId]);

  // 드래그드랍 핸들러함수
  const onDragEnd = useCallback(
    async (result: DropResult) => {
      const { destination, source, draggableId } = result;
      if (!destination) return;
      if (destination.droppableId === source.droppableId) return;
      if (destination.droppableId === source.droppableId && source.index === destination.index) return;

      const dragStartColumnId = Number(source.droppableId);
      const startCardList = entireList.cards[dragStartColumnId];
      const movingCard = startCardList.splice(source.index, 1);

      const dragEndColumnId = Number(destination.droppableId);
      const endCardList = entireList.cards[dragEndColumnId];
      endCardList.splice(destination.index, 0, ...movingCard);

      const res = await sender.put({
        path: "card",
        id: movingCard[0].id,
        data: { ...movingCard[0], columnId: dragEndColumnId },
        accessToken,
      });

      if (res.status > 204) return;

      setEntireList((prev) => ({
        ...prev,
        cards: {
          ...prev.cards,
          [dragStartColumnId]: startCardList.sort(
            (a, b) => Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
          ),
          [dragEndColumnId]: endCardList.sort((a, b) => Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))),
        },
      }));
    },
    [entireList]
  );

  if (!mount) return null;
  return (
    <>
      {/* 대시보드에 맞는 레이아웃으로 설정-헤더 수정 */}
      <MenuLayout dashboardList={dashboards}>
        <div className={style.redobutton}>
          <RedoButton />
        </div>
        <div className={style.layoutContainer}>
          <div className={style.columnContainer}>
            <DragDropContext onDragEnd={onDragEnd}>
              {entireList.columnOrder.map((columnId) => {
                const column = entireList.columns[columnId];
                return (
                  <Column
                    key={column.id}
                    title={column.title}
                    columnId={column.id}
                    dashboardId={column.dashboardId}
                    accessToken={accessToken}
                    assigneeList={assigneeList}
                    entireList={entireList}
                    setEntireList={setEntireList}
                  />
                );
              })}
            </DragDropContext>
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
        <ModalWrapper size="md" handleModalClose={handleCreateNewColumnModalToggle}>
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
