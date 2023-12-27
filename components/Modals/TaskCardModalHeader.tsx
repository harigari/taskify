import React, { useState } from "react";
import styles from "./TaskCardModal.module.css";
import { TaskInfo } from "./Modal.type";
import Image from "next/image";
interface TaskCardInfoProps {
  data: TaskInfo;
}
const TaskCardModalHeader = ({ data }: TaskCardInfoProps) => {
  const [isKebabOpen, SetIsKebabOpen] = useState(false);
  const handleKebab = () => {
    isKebabOpen ? SetIsKebabOpen(false) : SetIsKebabOpen(true);
  };
  return (
    <div className={styles.header}>
      <h1>{data.title}</h1>
      <div className={styles.icons}>
        <button onClick={handleKebab}>
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
  );
};

export default TaskCardModalHeader;
