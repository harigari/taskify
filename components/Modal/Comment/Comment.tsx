import { FormEvent } from "react";
import ModalButton from "../ModalButton/ModalButton";
import styles from "./Comment.module.css";

interface CommentProps {
  value: string;
  onSubmit: (e: FormEvent) => void;
}

function Comment({ value, onSubmit }: CommentProps) {
  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.label}>댓글</label>
        <div className={styles.textareaWrapper}>
          <textarea value={value} className={styles.textarea} placeholder="댓글 작성하기"></textarea>
          <ModalButton.ModalSubmit className={styles.button} />
        </div>
      </form>
    </div>
  );
}

export default Comment;
