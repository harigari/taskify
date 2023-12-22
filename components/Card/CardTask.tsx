import { useState, useEffect } from "react";
import Image from "next/image";
import style from "./CardTask.module.css";
import { CardTaskProps } from "./card.type";
import ChipTag from "../Chips/ChipTag/ChipTag";
import ProfileIcon from "../header/members/ProfileIcon";
// import CardAssignee from "./CardAssinee";

const CardTask = ({ imageUrl, title, tags, dueDate, assignee }: CardTaskProps) => {
  const tagSlicer = (tagList: string[]) => {
    const tagLength = tagList.slice(0, 3).join("").length;

    if (tagLength > 15) {
      return { slicedTagList: tagList.slice(0, 2), etc: tagList.length - 2 };
    } else {
      return { slicedTagList: tagList.slice(0, 3), etc: tagList.length - 3 };
    }
  };
  const { slicedTagList, etc } = tagSlicer(tags);

  //날짜 변환
  const convertToUTC = (dueDate: string): string => {
    const utcDate = new Date(dueDate);
    const year = utcDate.getUTCFullYear();
    const month = String(utcDate.getUTCMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고, 두 자리로 패딩
    const day = String(utcDate.getUTCDate()).padStart(2, "0"); // 날짜를 두 자리로 패딩

    return `${year}.${month}.${day}`;
  };

  return (
    <div className={style.cardContainer}>
      {/* 카드 이미지 */}
      {imageUrl && (
        <div className={style.imageWrapper}>
          <Image width={274} height={160} className={style.imageContent} src={imageUrl} />
        </div>
      )}
      {/* 카드 내용 */}
      <div className={style.cardContentContainer}>
        {/* 카드 제목 */}
        <span className={style.cardTitleWrapper}>{title}</span>
        <div className={style.allContentContainer}>
          {/* 카드 태그들 */}
          <div className={style.cardTagCotainer}>
            <div className={style.cardTagsWrapper}>
              {slicedTagList.map((tag: string) => (
                <ChipTag size="sm" key={tag}>
                  {tag}
                </ChipTag>
              ))}
            </div>
            {etc > 0 && (
              <div className={style.cardCountWrapper}>
                <span>그 외 {etc}개</span>
              </div>
            )}
          </div>
          {/* 카드 하단 날짜, 지정자 */}
          <div className={style.cardInfoWrapper}>
            <div className={style.dateWrapper}>
              <img className={style.dateIcon} src="/images/icons/calendar.svg" />
              <span className={style.date}>{convertToUTC(dueDate)}</span>
            </div>
            <ProfileIcon member={assignee} size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTask;
