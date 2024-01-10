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
import Head from "next/head";
import { dehydrate, useQuery } from "@tanstack/react-query";
import { clientProvider } from "@/apis/clientProvider";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const accessToken = getAccessTokenFromCookie(context) as string;
  const boardId = Number(context.query["boardId"]);

  const {
    data: { data: columnData },
  } = await sender.get({ path: "columns", id: boardId, accessToken });

  if (!columnData) {
    return {
      notFound: true,
    };
  }

  const entireData: EntireData = {
    cards: {},
    columns: {},
    columnOrder: [],
  };

  const queryClient = await clientProvider(context);

  for (const value of columnData) {
    entireData.columnOrder.push(value.id);
    entireData.columns[value.id] = value;
  }

  if (!accessToken) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  return {
    props: { accessToken, boardId, entireData, dehydratedState: dehydrate(queryClient) },
  };
};

const Dashboard = ({ accessToken, boardId, entireData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [entireList, setEntireList] = useState(entireData);
  const [isCreateModal, setIsCreateModal] = useState(false);

  // const [dashboardList, setDashboardList] = useAtom(dashboardListAtom);
  // if (!dashboardList.length) {
  //   setDashboardList(dashboards);
  // }

  const dashboards = useQuery({
    queryKey: ["dashboards"],
    queryFn: () =>
      sender.get({
        path: "dashboards",
        method: "pagination",
        size: 999,
        accessToken,
      }),
  });

  const dashboardList = dashboards?.data?.data.dashboards ?? [];

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

  const router = useRouter();

  useEffect(() => {
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

  return (
    <>
      <Head>
        <title>{`Taskify - ${dashboardList?.find((v) => v.id === Number(boardId))?.title}`}</title>
      </Head>
      <MenuLayout>
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
