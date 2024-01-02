import ChipNum from "../Chips/ChipNum/ChipNum";
import ChipPlus from "../Chips/ChipPlus/ChipPlus";
import ChipTodo from "../Chips/ChipTodo/ChipTodo";
import style from "./Column.module.css";
import Card from "@/components/Card/Card";
import stylesFromSingle from "@/modals/Modal.module.css";
import Image from "next/image";
import Button from "../Buttons/Button/Button";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import MultiInputModal from "@/modals/MultiInputModal";
import InputWrapper from "../Input/InputWrapper";
import ModalWrapper from "@/modals/ModalWrapper";
import clsx from "clsx";
import Input from "../Input/Input";
import useInputController from "@/hooks/useInputController";
import AlertModal from "@/modals/AlertModal";
import useApi from "@/hooks/useApi";
import { getAccessTokenFromDocument } from "@/utils/getAccessToken";
import { CardData, ColumnData, Member } from "@/types/api.type";
import ModalButton from "@/modals/components/ModalButton/ModalButton";
import sender from "@/apis/sender";
import { useRouter } from "next/router";

interface ColumnProps {
  accessToken: string;
  title: string;
  dashboardId: number;
  setColumnList: Dispatch<SetStateAction<ColumnData[]>>;
  assigneeList: Member[];
  columnId: number;
}

export const Column = ({ accessToken, title, dashboardId, assigneeList, columnId, setColumnList }: ColumnProps) => {
  const [cardList, setCardList] = useState<CardData[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isColumnDeleteModalOpen, setIsColumnDeleteModalOpen] = useState(false);
  const settingModal = useInputController({
    inputConfig: { id: "settingModal", initialvalue: title },
    labelConfig: { labelName: "이름" },
  });

  const { pending: deletePending, wrappedFunction: deleteData } = useApi("delete");

  const router = useRouter();
  useEffect(() => {
    (async function () {
      const {
        data: { cards },
      } = await sender.get({ path: "cards", id: columnId, accessToken });
      setCardList(cards);
    })();
  }, [router.query]);

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
      setColumnList((prevValue) => {
        const newData = prevValue.map((column) => {
          if (column.id !== columnId) return column;

          const value = settingModal.input.value;

          const changedColumn = { ...column, title: value };

          return changedColumn;
        });

        return newData;
      });
      handleSettingModalToggle();
    }
  };

  const handleColumnDelete = async (e: FormEvent) => {
    e.preventDefault();

    const deleteRes = await deleteData({ path: "column", id: columnId, accessToken });

    if (deleteRes?.status === 204) {
      handleSettingModalToggle();
      handleDeleteModalToggle();
      setColumnList((prevValue) => {
        const newValue = prevValue.filter((column) => column.id !== columnId);
        return newValue;
      });
    }
  };

  return (
    <>
      <div className={style.totalContainer}>
        {/* 칼럼 상단 */}
        <div className={style.headerContainer}>
          <div className={style.todoWrapper}>
            <ChipTodo size="sm" color="white">
              {title}
            </ChipTodo>
            <ChipNum>{cardList.length}</ChipNum>
          </div>
          <button onClick={handleSettingModalToggle}>
            <Image width={24} height={24} src="/icons/icon-settings.svg" alt="칼럼 설정하기" />
          </button>
        </div>

        <div className={style.contentContainer}>
          {/* 컴포넌트로 바꾸기 */}
          <Button buttonType="plus_icon" color="white" onClick={handleCreateModalToggle}>
            <ChipPlus size="lg" />
          </Button>
          {cardList.map((card) => (
            <Card key={card.id} columnTitle={title} data={card} setCardList={setCardList} />
          ))}
        </div>
      </div>

      {isCreateModalOpen && (
        <MultiInputModal
          setCardList={setCardList}
          title="할 일 생성"
          buttonText="생성"
          columnId={columnId}
          assigneeList={assigneeList}
          dashboardId={dashboardId}
          handleModalClose={handleCreateModalToggle}
        />
      )}

      {isSettingModalOpen && (
        <ModalWrapper size="md">
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
    </>
  );
};
