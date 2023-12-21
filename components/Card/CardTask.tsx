import { useState, useEffect } from "react";
import style from "./CardTask.module.css";
import { CardTaskProps } from "./card.type";
import ChipTag from "../Chips/ChipTag/ChipTag";
import ProfileIcon from "../header/members/ProfileIcon";

const CardTask = ({ imageUrl, title, tags, dueDate, assignee }: CardTaskProps) => {
  const [slicedTags, setSlicedTags] = useState(tags.slice(0, 4));
  const [cardCount, setCardCount] = useState(0);
  useEffect(() => {
    if (slicedTags.join("").length > 15) {
      setSlicedTags(slicedTags.slice(0, 2));
      setCardCount(tags.length - 2);
    } else {
      setCardCount(tags.length - 4);
    }
  }, []);
  return (
    <div className={style.cardContainer}>
      {/* 카드 이미지 */}
      {imageUrl && <img src={imageUrl} />}
      {/* 카드 내용 */}
      <div className={style.cardContentContainer}>
        {/* 카드 제목 */}
        <span className={style.cardTitleWrapper}>{title}</span>
        {/* 카드 태그들 */}
        <div className={style.cardTagCotainer}>
          <div className={style.cardTagsWrapper}>
            {slicedTags.map((tag) => (
              <ChipTag size="sm">{tag}</ChipTag>
            ))}{" "}
            ...
          </div>
          <div className={style.cardCountWrapper}>
            <span>그 외 {cardCount}개</span>
          </div>
        </div>
        {/* 카드 하단 날짜, 지정자 */}
        <div className={style.cardInfoWrapper}>
          <div className={style.dateWrapper}>
            <img src="/images/icons/calendar.svg" />
            <span className={style.date}>{dueDate}</span>
          </div>
          <div>
            <ProfileIcon member={assignee} size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTask;
