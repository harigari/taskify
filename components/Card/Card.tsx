import style from "./Card.module.css";
import { CardProps } from "./Card.type";
import ChipTodo from "../Chips/ChipTodo/ChipTodo";
import ChipNum from "../Chips/ChipNum/ChipNum";
import ChipPlus from "../Chips/ChipPlus/ChipPlus";
import CardTask from "./CardTask";
const Card = ({ cardList, columnName }: CardProps) => {
  return (
    <div className={style.totalContainer}>
      {/* 칼럼 상단 */}
      <div className={style.headerContainer}>
        <div className={style.todoWrapper}>
          <ChipTodo size="sm" color="white">
            {columnName}
          </ChipTodo>
          <ChipNum>{cardList.length}</ChipNum>
        </div>
        <img src="/icons/setting.svg" />
      </div>

      <div className={style.contentContainer}>
        {/* 컴포넌트로 바꾸기 */}
        <div className={style.buttonWrapper}>
          <ChipPlus size="lg"></ChipPlus>
        </div>
        {cardList.map((card) => (
          <CardTask
            key={card.id}
            imageUrl={card.imageUrl}
            title={card.title}
            tags={card.tags}
            dueDate={card.dueDate}
            assignee={card.assignee}
          />
        ))}
      </div>
    </div>
  );
};

export default Card;
