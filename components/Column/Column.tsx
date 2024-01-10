import sender from "@/apis/sender";
import Card from "@/components/Card/Card";
import useApi from "@/hooks/useApi";
import useInfScroll from "@/hooks/useInfScroll";
import useInputController from "@/hooks/useInputController";
import AlertModal from "@/modals/AlertModal";
import stylesFromSingle from "@/modals/Modal.module.css";
import ModalWrapper from "@/modals/ModalWrapper";
import MultiInputModal from "@/modals/MultiInputModal";
import ModalButton from "@/modals/components/ModalButton/ModalButton";
import { CardData, EntireData, Member } from "@/types/api.type";
import { getAccessTokenFromDocument } from "@/utils/getAccessToken";
import { Droppable } from "@hello-pangea/dnd";
import clsx from "clsx";
import Image from "next/image";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import Button from "../Buttons/Button/Button";
import ChipNum from "../Chips/ChipNum/ChipNum";
import ChipPlus from "../Chips/ChipPlus/ChipPlus";
import ChipTodo from "../Chips/ChipTodo/ChipTodo";
import Input from "../Input/Input";
import InputWrapper from "../Input/InputWrapper";
import style from "./Column.module.css";

interface ColumnProps {
  accessToken: string;
  title: string;
  dashboardId: number;
  columnId: number;
  entireList: EntireData;
  setEntireList: Dispatch<SetStateAction<EntireData>>;
}

type Pagination = {
  id: number;
  size: number;
  cursorId?: number;
};

type InfRes = {
  cards: CardData[];
  cursorId: number;
  totalCount: number;
};

export const Column = ({ accessToken, title, dashboardId, columnId, entireList, setEntireList }: ColumnProps) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setTotalCount(entireList.cards[columnId]?.length);
  }, [entireList]);

  const [isColumnDeleteModalOpen, setIsColumnDeleteModalOpen] = useState(false);
  const settingModal = useInputController({
    inputConfig: { id: "settingModal", initialvalue: title },
    labelConfig: { labelName: "이름" },
  });

  const { pending: deletePending, wrappedFunction: deleteData } = useApi("delete");

  const { isVisible, setIsVisible, myRef } = useInfScroll();

  const [pagination, setPagination] = useState<Pagination>({
    id: columnId,
    size: 5,
  });

  //  카드리스트 가져오기
  const getCards = async () => {
    const { id, size, cursorId } = pagination;
    let response;
    if (cursorId) {
      response = await sender.get({ path: "cards", id, size, cursorId, accessToken });
    } else {
      response = await sender.get({ path: "cards", id, size, accessToken });
    }

    if (response.status !== 200) return;

    const { cards, cursorId: cursor, totalCount } = response.data;

    setPagination((prevValue) => {
      return { ...prevValue, cursorId: cursor };
    });
    setEntireList((prev) => ({
      ...prev,
      cards: { ...prev.cards, [columnId]: [...(prev.cards[columnId] ?? []), ...cards] },
    }));
    setIsVisible(false);
    setTotalCount(totalCount);
  };

  useEffect(() => {
    if (pagination.cursorId === null) return;
    if (isVisible) {
      getCards();
    }
  }, [isVisible]);

  const handleCreateModalToggle = () => {
    setIsCreateModalOpen((prevValue) => !prevValue);
  };

  const handleSettingModalToggle = () => {
    setIsSettingModalOpen((prevValue) => !prevValue);
  };

  const handleDeleteModalToggle = () => {
    setIsColumnDeleteModalOpen((prevValue) => !prevValue);
  };

  const { pending, wrappedFunction: putData } = useApi("put");

  const handleModifyColumn = async (e: FormEvent) => {
    e.preventDefault();

    const accessToken = getAccessTokenFromDocument("accessToken");

    if (pending) return;

    const putRes = await putData({
      path: "column",
      id: columnId,
      data: { title: settingModal.input.value },
      accessToken,
    });

    if (putRes?.status === 200) {
      setEntireList((prev) => ({
        ...prev,
        columns: { ...prev.columns, [putRes.data.id]: putRes.data },
      }));
      handleSettingModalToggle();
    }
  };

  const handleColumnDelete = async (e: FormEvent) => {
    e.preventDefault();

    if (deletePending) return;
    const deleteRes = await deleteData({ path: "column", id: columnId, accessToken });

    if (deleteRes?.status === 204) {
      handleSettingModalToggle();
      handleDeleteModalToggle();

      setEntireList(
        (prev) => (
          delete prev.columns[columnId],
          {
            ...prev,
            columnOrder: prev.columnOrder.filter((id) => id !== columnId),
          }
        )
      );
    }
  };

  return (
    <>
      <Droppable droppableId={String(columnId)}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className={style.totalContainer}>
            {/* 칼럼 상단 */}
            <div className={style.headerContainer}>
              <div className={style.todoWrapper}>
                <ChipTodo size="sm" color="white">
                  {title}
                </ChipTodo>
                <ChipNum>{totalCount}</ChipNum>
              </div>
              <button onClick={handleSettingModalToggle}>
                <Image width={24} height={24} src="/icons/icon-settings.svg" alt="칼럼 설정하기" />
              </button>
            </div>

            <div className={style.contentContainer}>
              <Button buttonType="plus_icon" color="white" onClick={handleCreateModalToggle}>
                <ChipPlus size="lg" />
              </Button>
              {entireList.cards[columnId]?.map((card, index) => (
                <Card key={card.id} columnTitle={title} data={card} index={index} setEntireList={setEntireList} />
              ))}
              <p ref={myRef}></p>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {isSettingModalOpen && (
        <ModalWrapper size="md" handleModalClose={handleSettingModalToggle}>
          <form className={stylesFromSingle.form} onSubmit={handleModifyColumn} noValidate>
            <div className={stylesFromSingle.modal}>
              <div className={stylesFromSingle.modalTitle}>컬럼 관리</div>

              <InputWrapper {...settingModal.wrapper}>
                <Input {...settingModal.input} />
              </InputWrapper>
            </div>

            <div className={clsx(stylesFromSingle.buttonContainer, stylesFromSingle.deleteButton)}>
              <button className={stylesFromSingle.button} onClick={handleDeleteModalToggle} type="button">
                삭제하기
              </button>

              <ModalButton.DoubleButton
                disabled={pending || !settingModal.input.value}
                onClick={handleSettingModalToggle}
              >
                변경
              </ModalButton.DoubleButton>
            </div>
          </form>
        </ModalWrapper>
      )}
      {isColumnDeleteModalOpen && (
        <AlertModal
          handleModalClose={handleDeleteModalToggle}
          alertText="컬럼의 모든 카드가 삭제됩니다."
          handleSubmit={handleColumnDelete}
        />
      )}
      {isCreateModalOpen && (
        <MultiInputModal
          setEntireList={setEntireList}
          title="할 일 생성"
          buttonText="생성"
          columnId={columnId}
          dashboardId={dashboardId}
          handleModalClose={handleCreateModalToggle}
        />
      )}
    </>
  );
};
