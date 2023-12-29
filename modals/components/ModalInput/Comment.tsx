import { ChangeEvent, ReactNode } from "react";
import ModalButton from "../ModalButton/ModalButton";
import styles from "./Comment.module.css";

interface CommentProps {
  value: string;
  id: string;
  children: ReactNode;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string | undefined;
}

function Comment({ value, onChange, id, placeholder, children }: CommentProps) {
  return (
    <>
      <textarea
        value={value}
        id={id}
        onChange={onChange}
        className={styles.textarea}
        placeholder={placeholder}
      ></textarea>
      <ModalButton.ModalSubmit className={styles.button}>{children}</ModalButton.ModalSubmit>
    </>
  );
}

export default Comment;
