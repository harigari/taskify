import React, { useState } from "react";
import { TaskInfo } from "./Modal.type";
import styles from "./TaskCardModal.module.css";
import Image from "next/image";
interface TaskCardInfoProps {
  data: TaskInfo;
}
const TaskCardModal = ({ data }: TaskCardInfoProps) => {
  const [isKebabOpen, SetIsKebabOpen] = useState(false);
  const handleKebab = () => {
    isKebabOpen ? SetIsKebabOpen(true) : SetIsKebabOpen(false);
  };
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>{data.title}</h1>
          <div className={styles.icons}>
            <button onClick={handleKebab}>
              <Image src="/icons/kebab.svg" alt="케밥 아이콘" width={28} height={28} />
            </button>
            <div className={styles.options}>
              <div>수정하기</div>
              <div>삭제하기</div>
            </div>
            <button>
              <Image src="/icons/close.svg" alt="창닫기 아이콘" width={32} height={32} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskCardModal;
