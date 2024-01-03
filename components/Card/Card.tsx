import ProfileIcon from "@/components/Members/ProfileIcon";
import { CardData } from "@/types/api.type";
import Image from "next/image";
import ChipTag from "../Chips/ChipTag/ChipTag";
import styles from "./Card.module.css";
import formatDateString from "@/utils/formatDateString";
import { Dispatch, SetStateAction, useState } from "react";
import TaskCardModal from "@/modals/TaskCardModal";
import { Draggable } from "@hello-pangea/dnd";

interface CardProps {
  data: CardData;
  index: number;
  columnTitle: string;
  setCardList: Dispatch<SetStateAction<CardData[]>>;
}

const Card = ({ data, index, columnTitle, setCardList }: CardProps) => {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const { slicedTagList, etc } = tagSlicer(data.tags);

  const handleCardModalToggle = () => {
    setIsCardModalOpen((prevValue) => !prevValue);
  };

  return (
    <Draggable draggableId={String(data.id)} index={index}>
      {(provided) => (
        <>
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={styles.cardContainer}
            onClick={handleCardModalToggle}
          >
            {/* 카드 이미지 */}
            {data.imageUrl && (
              <div className={styles.imageWrapper}>
                <Image width={274} height={160} className={styles.imageContent} src={data.imageUrl} alt="카드" />
              </div>
            )}
            {/* 카드 내용 */}
            <div className={styles.cardContentContainer}>
              {/* 카드 제목 */}
              <span className={styles.cardTitleWrapper}>{data.title}</span>
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
                    <span className={styles.date}>{formatDateString(data.dueDate, "KOREA", "yyyy.MM.dd")}</span>
                  </div>
                  <ProfileIcon member={data.assignee} size="sm" />
                </div>
              </div>
            </div>
          </div>
          {isCardModalOpen && (
            <TaskCardModal
              data={data}
              columnTitle={columnTitle}
              handleModalClose={handleCardModalToggle}
              setCardList={setCardList}
            />
          )}
        </>
      )}
    </Draggable>
  );
};

export default Card;

const tagSlicer = (tagList: string[]) => {
  const tagLength = tagList.slice(0, 3).join("").length;

  if (tagLength > 15) {
    return { slicedTagList: tagList.slice(0, 2), etc: tagList.length - 2 };
  } else {
    return { slicedTagList: tagList.slice(0, 3), etc: tagList.length - 3 };
  }
};
