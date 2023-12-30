import { CardData, Member } from "@/types/api.type";
import ChipNum from "../Chips/ChipNum/ChipNum";
import ChipPlus from "../Chips/ChipPlus/ChipPlus";
import ChipTodo from "../Chips/ChipTodo/ChipTodo";
import style from "./Column.module.css";
import Card from "@/components/Card/Card";
import stylesFromSingle from "@/modals/Modal.module.css";
import Image from "next/image";
import Button from "../Buttons/Button/Button";
import { useState } from "react";
import MultiInputModal from "@/modals/MultiInputModal";
import InputWrapper from "../Input/InputWrapper";
import ModalWrapper from "@/modals/ModalWrapper";
import ModalButton from "@/modals/components/ModalButton/ModalButton";
import clsx from "clsx";
import Input from "../Input/Input";
import useInputController from "@/hooks/useInputController";
import AlertModal from "@/modals/AlertModal";

interface ColumnPorps {
  cardList: CardData[];
  title: string;
  columnId: number;
  dashboardId: number;
  assigneeList: Member[];
}

const Column = ({ title, cardList, dashboardId, assigneeList, columnId }: ColumnPorps) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isColumnDeleteModalOpen, setIsColumnDeleteModalOpen] = useState(false);

  const settingModal = useInputController({
    inputConfig: { id: "settingModal", initialValue: title },
    labelConfig: { labelName: "이름" },
  });

  const handleCreateModalToggle = () => {
    setIsCreateModalOpen((prevValue) => !prevValue);
  };

  const handleSettingModalToggle = () => {
    setIsSettingModalOpen((prevValue) => !prevValue);
  };

  const handleDeleteodalToggle = () => {
    setIsColumnDeleteModalOpen((prevValue) => !prevValue);
  };

  /**
   * @todo 1. {teamId}/columns/{columnId}에서 페치
   * @todo 2. handleSettingModalToggle를 사용해 모달 닫기
   * @todo 3. settingModal.input.setValue(title)로 다시 값 초기화?
   */
  const handleFormSubmit = () => {};

  /**
   * @todo 1. {teamId}/columns/{columnId}에서 페치
   * @todo 2. handleSettingModalToggle, handleDeleteodalToggle을 사용해 모달 둘 다 닫기
   * @todo 3. settingModal.input.setValue(title)로 다시 값 초기화?
   */
  const handleColumnDelete = () => {};

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
            <Card key={card.id} {...card} />
          ))}
        </div>
      </div>

      {isCreateModalOpen && (
        <MultiInputModal
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
          <form className={stylesFromSingle.form} onSubmit={handleFormSubmit} noValidate>
            <div className={stylesFromSingle.modal}>
              <div className={stylesFromSingle.modalTitle}>컬럼 관리</div>

              <InputWrapper {...settingModal.wrapper}>
                <Input {...settingModal.input} />
              </InputWrapper>
            </div>

            <div className={clsx(stylesFromSingle.buttonContainer, stylesFromSingle.deleteButton)}>
              <button className={stylesFromSingle.button} onClick={handleDeleteodalToggle} type="button">
                삭제하기
              </button>

              <ModalButton.DoubleButton onClick={handleSettingModalToggle}>변경</ModalButton.DoubleButton>
            </div>
          </form>
        </ModalWrapper>
      )}

      {isColumnDeleteModalOpen && (
        <AlertModal
          handleModalClose={handleDeleteodalToggle}
          alertText="컬럼의 모든 카드가 삭제됩니다."
          handleSubmit={handleColumnDelete}
        />
      )}
    </>
  );
};

export default Column;
