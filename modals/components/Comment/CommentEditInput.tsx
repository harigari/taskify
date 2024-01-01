import React from "react";
import Comment from "@/modals/components/Comment/Comment";
import { MouseEvent, ChangeEvent, useState } from "react";
import styles from "./Comment.module.css";
interface CommentEditInputProps {
  initialValue: string;
  handleEditCancel: (e: MouseEvent) => void;
}

const CommentEditInput = ({ initialValue, handleEditCancel }: CommentEditInputProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <input value={value} onChange={handleChange} />
      <div className={styles.buttons}>
        <button className={styles.button}>수정</button>
        <button className={styles.button} type="button" onClick={handleEditCancel}>
          취소
        </button>
      </div>
    </>
  );
};

export default CommentEditInput;
