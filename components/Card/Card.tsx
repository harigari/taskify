import style from "./Card.module.css";
import ChipTodo from "../Chips/ChipTodo/ChipTodo";
import ChipNum from "../Chips/ChipNum/ChipNum";
import ChipPlus from "../Chips/ChipPlus/ChipPlus";
import ChipTag from "../Chips/ChipTag/ChipTag";
import ProfileIcon from "../header/members/ProfileIcon";
const Card = () => {
  return (
    <div className={style.totalContainer}>
      <div className={style.headerContainer}>
        <div className={style.todoWrapper}>
          <ChipTodo size="sm" color="white">
            On Progress
          </ChipTodo>
          <ChipNum>2</ChipNum>
        </div>
        <img src="/images/icons/setting.svg" />
      </div>

      <div className={style.contentContainer}>
        <div className={style.buttonWrapper}>
          <ChipPlus size="lg"></ChipPlus>
        </div>
        <div className={style.cardContainer}>
          <img src="/images/photos/card-image1.svg" />
          <div className={style.cardContentContainer}>
            <span className={style.cardTitleWrapper}>새로운 일정 관리 Taskify</span>
            <div className={style.cardTagsWrapper}>
              <ChipTag size="sm">가나다라오</ChipTag>
              <ChipTag size="sm">라라라</ChipTag>
              <ChipTag size="sm">차차차</ChipTag>
            </div>
            <div className={style.cardInfoWrapper}>
              <div className={style.dateWrapper}>
                <img src="/images/icons/calendar.svg" />
                <span className={style.date}>2022.12.31</span>
              </div>
              <div>ss</div>
              {/* <ProfileIcon member> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
