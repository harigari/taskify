import React, { useRef, useState, FocusEvent, FormEvent } from "react";
import { TaskInfo } from "./Modal.type";
import styles from "./TaskCardModal.module.css";
import Image from "next/image";
import ChipTodo from "../components/Chips/ChipTodo/ChipTodo";
import ChipTag from "../components/Chips/ChipTag/ChipTag";
import Comment from "./components/Comment/Comment";
import useInputController from "@/hooks/useInputController";
import AssigneeAndDueDateInfo from "./components/AssigneeAndDueDateInfo/AssigneeAndDueDateInfo";
import InputWrapper from "../components/Input/InputWrapper";
import CommentInput from "@/modals/components/ModalInput/CommentInput";

interface TaskCardInfoProps {
  data: TaskInfo;
}

const TaskCardModal = ({ data }: TaskCardInfoProps) => {
  const [isKebabOpen, setIsKebabOpen] = useState(false);
  const handleKebab = () => {
    setIsKebabOpen((prevValue) => !prevValue);
  };

  const optionsRef = useRef<HTMLDivElement>(null);

  const handleKebabClose = (e: FocusEvent) => {
    if (!optionsRef.current?.contains(e.relatedTarget)) {
      setIsKebabOpen(false);
    }
  };

  const comment = useInputController({
    inputConfig: { id: "comment", type: "text" },
    labelConfig: { labelName: "댓글", mobile: true },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // api 리퀘스트로 댓글 내용 보내기
  };

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
          <h1 className={styles.title}>{data.title}</h1>
          <div className={styles.icons}>
            <button className={styles.icon} onClick={handleKebab} onBlur={handleKebabClose}>
              <Image src="/icons/kebab.svg" alt="케밥 아이콘" width={28} height={28} />
            </button>
            {isKebabOpen && (
              <div className={styles.options} ref={optionsRef}>
                <button className={styles.option}>수정하기</button>
                <button className={styles.option}>삭제하기</button>
              </div>
            )}
            <button className={styles.icon}>
              <Image src="/icons/close.svg" alt="창닫기 아이콘" width={32} height={32} />
            </button>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.first}>
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

            <div className={styles.description}>{data.description}</div>
            <div className={styles.image_wrapper}>
              <Image fill src={data.imageUrl} alt="할 일 카드 이미지" />
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <InputWrapper {...comment.wrapper}>
                <CommentInput disabled={!comment.input.value} {...comment.textarea}>
                  입력
                </CommentInput>
              </InputWrapper>
            </form>
            <div className={styles.comments}>
              {comments.map((comment) => (
                <Comment key={comment.id} data={comment} />
              ))}
            </div>
          </div>

          <AssigneeAndDueDateInfo data={data} />
        </div>
      </div>
    </>
  );
};

export default TaskCardModal;