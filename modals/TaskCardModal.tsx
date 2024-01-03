import useApi from "@/hooks/useApi";
import EditInputModal from "@/modals/EditInputModal";
import CommentList from "@/modals/components/Comment/CommentList";
import { CardData } from "@/types/api.type";
import { getAccessTokenFromDocument } from "@/utils/getAccessToken";
import Image from "next/image";
import { Dispatch, FocusEvent, FormEvent, SetStateAction, useRef, useState } from "react";
import ChipTag from "../components/Chips/ChipTag/ChipTag";
import ChipTodo from "../components/Chips/ChipTodo/ChipTodo";
import AlertModal from "./AlertModal";
import ModalWrapper from "./ModalWrapper";
import styles from "./TaskCardModal.module.css";
import AssigneeAndDueDateInfo from "./components/AssigneeAndDueDateInfo/AssigneeAndDueDateInfo";

interface TaskCardInfoProps {
  columnTitle: string;
  data: CardData;
  setCardList: Dispatch<SetStateAction<CardData[]>>;
  handleModalClose: () => void;
}

const TaskCardModal = ({ data, columnTitle, setCardList, handleModalClose }: TaskCardInfoProps) => {
  const [isKebabOpen, setIsKebabOpen] = useState(false);
  const [isCardModifyModalOpen, setCardModifyModalOpen] = useState(false);
  const [isCardDeleteModalOpen, setCardDeleteModalOpen] = useState(false);

  const accessToken = getAccessTokenFromDocument("accessToken");

  // 케밥 열고 닫기
  const handleKebab = () => {
    setIsKebabOpen((prevValue) => !prevValue);
  };

  const optionsRef = useRef<HTMLDivElement>(null);

  const handleKebabClose = (e: FocusEvent) => {
    if (!optionsRef.current?.contains(e.relatedTarget)) {
      setIsKebabOpen(false);
    }
  };

  // 수정하기 모달 열고 닫기
  const handleModifyModalToggle = () => {
    setCardModifyModalOpen((prevValue) => !prevValue);
  };

  // 삭제하기 모달 열고 닫기
  const handleDeleteModalToggle = () => {
    setCardDeleteModalOpen((prevValue) => !prevValue);
  };

  const { pending, wrappedFunction: deleteData } = useApi("delete");

  // 카드 삭제하기
  const handleCardDelete = async (e: FormEvent) => {
    e.preventDefault();

    const res = await deleteData({ path: "card", id: data.id, accessToken });

    if (pending) return;

    if (res?.status === 204) {
      handleDeleteModalToggle();
      handleModalClose();
      setCardList((prevValue) => {
        const newCardList = prevValue.filter((card) => card.id !== data.id);
        return newCardList;
      });
    }
  };

  return (
    <ModalWrapper size="lg" handleModalClose={handleModalClose}>
      <div className={styles.modal_wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>{data.title}</h1>
          <div className={styles.icons}>
            <button className={styles.icon} onClick={handleKebab} onBlur={handleKebabClose}>
              <Image src="/icons/icon-kebab.svg" alt="케밥 아이콘" width={28} height={28} />
            </button>
            {isKebabOpen && (
              <div className={styles.options} ref={optionsRef}>
                <button className={styles.option} onClick={() => (handleModifyModalToggle(), setIsKebabOpen(false))}>
                  수정하기
                </button>
                <button className={styles.option} onClick={() => (handleDeleteModalToggle(), setIsKebabOpen(false))}>
                  삭제하기
                </button>
              </div>
            )}
            {isCardModifyModalOpen && (
              <EditInputModal
                initialvalue={data}
                title="할 일 수정"
                columnTitle={columnTitle}
                buttonText="수정"
                setCardList={setCardList}
                handleModalClose={handleModifyModalToggle}
              />
            )}
            {isCardDeleteModalOpen && (
              <AlertModal
                handleSubmit={handleCardDelete}
                alertText="카드를 삭제하시겠습니까?"
                handleModalClose={handleDeleteModalToggle}
              />
            )}
            <button type="button" className={styles.icon} onClick={handleModalClose}>
              <Image src="/icons/icon-close-black.svg" alt="창닫기 아이콘" width={32} height={32} />
            </button>
          </div>
        </div>

        <div className={styles.body}>
          {/* 칩 부분 */}
          <div className={styles.first}>
            <div className={styles.chips}>
              <ChipTodo size="lg" color="purple">
                {columnTitle}
              </ChipTodo>
              <div className={styles.separator}></div>
              <div className={styles.tags}>
                {data?.tags.map((tag) => (
                  <ChipTag size="lg" key={tag}>
                    {tag}
                  </ChipTag>
                ))}
              </div>
            </div>

            {/* 설명 및 사진 */}
            <p className={styles.description}>{data.description}</p>
            {data?.imageUrl && (
              <div className={styles.image_wrapper}>
                <Image priority fill src={data.imageUrl} alt="할 일 카드 이미지" />
              </div>
            )}
            {/* 댓글 리스트 */}
            <CommentList cardData={data} />
          </div>

          <AssigneeAndDueDateInfo data={data} />
        </div>
      </div>
    </ModalWrapper>
  );
};

export default TaskCardModal;
