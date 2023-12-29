import { ChangeEvent, Dispatch, SetStateAction } from "react";
import ModalButton from "../ModalButton/ModalButton";
import styles from "./Comment.module.css";

interface CommentProps {
  value: string;
  id: string;
  onChange: (e: ChangeEvent) => void;
  placeholder?: string | undefined;
}

function Comment({ value, onChange, id, placeholder }: CommentProps) {
  return (
    <>
      <textarea
        value={value}
        id={id}
        onChange={onChange}
        className={styles.textarea}
        placeholder={placeholder}
      ></textarea>
      <ModalButton.ModalSubmit className={styles.button} />
    </>
  );
}

export default Comment;
