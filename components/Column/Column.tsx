import { CardData, Member } from "@/types/api.type";
import ChipNum from "../Chips/ChipNum/ChipNum";
import ChipPlus from "../Chips/ChipPlus/ChipPlus";
import ChipTodo from "../Chips/ChipTodo/ChipTodo";
import style from "./Column.module.css";
import Card from "@/components/Card/Card";
import Image from "next/image";
import Button from "../Buttons/Button/Button";
import { useState } from "react";
import MultiInputModal from "@/modals/MultiInputModal";

interface ColumnPorps {
  cardList: CardData[];
  title: string;
  columnId: number;
  dashboardId: number;
  assigneeList: Member[];
}

const Column = ({ title, cardList, dashboardId, assigneeList, columnId }: ColumnPorps) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateModalToggle = () => {
    setIsCreateModalOpen((prevValue) => !prevValue);
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
          <button>
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
    </>
  );
};

export default Column;
