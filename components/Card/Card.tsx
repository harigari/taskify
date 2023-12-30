import ProfileIcon from "@/components/Members/ProfileIcon";
import { CardData } from "@/types/api.type";
import Image from "next/image";
import ChipTag from "../Chips/ChipTag/ChipTag";
import styles from "./Card.module.css";

const Card = ({ imageUrl, title, tags, dueDate, assignee }: CardData) => {
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
    const date = new Date(dueDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
  };

  return (
    <div className={styles.cardContainer}>
      {/* 카드 이미지 */}
      {imageUrl && (
        <div className={styles.imageWrapper}>
          <Image width={274} height={160} className={styles.imageContent} src={imageUrl} alt="카드" />
        </div>
      )}
      {/* 카드 내용 */}
      <div className={styles.cardContentContainer}>
        {/* 카드 제목 */}
        <span className={styles.cardTitleWrapper}>{title}</span>
        <div className={styles.allContentContainer}>
          {/* 카드 태그들 */}
          <div className={styles.cardTagContainer}>
            <div className={styles.cardTagsWrapper}>
              {slicedTagList.map((tag: string) => (
                <ChipTag size="sm" key={tag}>
                  {tag}
                </ChipTag>
              ))}
            </div>
            {etc > 0 && (
              <div className={styles.cardCountWrapper}>
                <span>그 외 {etc}개</span>
              </div>
            )}
          </div>
          {/* 카드 하단 날짜, 지정자 */}
          <div className={styles.cardInfoWrapper}>
            <div className={styles.dateWrapper}>
              <Image
                className={styles.dateIcon}
                src="/icons/icon-calendar.svg"
                alt="Calendar Icon"
                width={20}
                height={20}
              />
              <span className={styles.date}>{convertToUTC(dueDate)}</span>
            </div>
            <ProfileIcon member={assignee} size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
