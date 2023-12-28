import React, { useRef, useState, useEffect } from "react";
import { TaskInfo } from "./Modal.type";
import styles from "./TaskCardModal.module.css";
import Image from "next/image";
import ChipTodo from "../Chips/ChipTodo/ChipTodo";
import TaskCardModalHeader from "./TaskCardModalHeader";
import ChipTag from "../Chips/ChipTag/ChipTag";
import Comment from "./Comment";
import ProfileIcon from "../header/members/ProfileIcon";
import useInputController from "@/hooks/useInputController";
import InputWrapper from "../Input/InputWrapper";
import CommentInput from "../Modal/ModalInput/CommentInput";
import formatDate, { DateFormat } from "@/utils/formatDate";

interface TaskCardInfoProps {
  data: TaskInfo;
}

const TaskCardModal = ({ data }: TaskCardInfoProps) => {
  const [isKebabOpen, setIsKebabOpen] = useState(false);
  const handleKebab = () => {
    isKebabOpen ? setIsKebabOpen(false) : setIsKebabOpen(true);
  };

  // useRef 초기값은 뭐?
  const kebabRef = useRef(null);
  // const handleBackDropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   if (kebabRef.current !== e.target) {
  //     setIsKebabOpen(false);
  //   }
  // };
  const comment = useInputController({
    inputConfig: { id: "comment", type: "text" },
    labelConfig: { labelName: "댓글" },
  });
  const comments = [
    {
      id: 114,
      content: "유담아 ~~~~ ",
      createdAt: "2023-12-27T18:40:10.166Z",
      updatedAt: "2023-12-27T18:40:10.166Z",
      cardId: 81,
      author: {
        id: 102,
        nickname: "경서",
        profileImageUrl: null,
      },
    },
    {
      id: 115,
      content: "유담아 모해 ",
      createdAt: "2023-12-27T18:40:10.166Z",
      updatedAt: "2023-12-27T18:40:10.166Z",
      cardId: 81,
      author: {
        id: 103,
        nickname: "민지",
        profileImageUrl: null,
      },
    },
  ];

  return (
    <>
      <div className={styles.modal_wrapper}>
        <div className={styles.header}>
          <h1>{data.title}</h1>
          <div className={styles.icons}>
            <button ref={kebabRef} onClick={handleKebab}>
              <Image src="/icons/kebab.svg" alt="케밥 아이콘" width={28} height={28} />
            </button>
            {isKebabOpen && (
              <div className={styles.options}>
                <div className={styles.option}>수정하기</div>
                <div className={styles.option}>삭제하기</div>
              </div>
            )}
            <button>
              <Image src="/icons/close.svg" alt="창닫기 아이콘" width={32} height={32} />
            </button>
          </div>
        </div>

        <div className={styles.chips}>
          {/* 칼럼 아이디, 대시보드 아이디로 조회해서 가져와야하는 부분 */}
          <ChipTodo size="lg" color="purple">
            To Do
          </ChipTodo>
          <div className={styles.separator}></div>
          <div className={styles.tags}>
            {data.tags.map((tag) => (
              <ChipTag size="lg" key={tag}>
                {tag}
              </ChipTag>
            ))}
          </div>
        </div>
        <div className={styles.assignee_and_dueDate}>
          <div className={styles.dueDate}>
            <span className={styles.label}>담당자</span>
            <div className={styles.assignee}>
              <ProfileIcon size="lg" member={data.assignee} />
              <span className={styles.detail}>{data.assignee.nickname}</span>
            </div>
          </div>
          <div className={styles.dueDate}>
            <span className={styles.label}>마감일</span>
            <span className={styles.detail}>{formatDate(data.dueDate, DateFormat.Full)}</span>
          </div>
        </div>
        <div className={styles.description}>{data.description}</div>
        <div className={styles.image_wrapper}>
          <Image fill src={data.imageUrl} alt="할 일 카드 이미지" />
        </div>
        {/* <InputWrapper labelName="댓글">
          <CommentInput {...comment.textarea} />
        </InputWrapper> */}

        {comments.map((comment) => (
          <Comment key={comment.id} data={comment} />
        ))}
      </div>
    </>
  );
};

export default TaskCardModal;
