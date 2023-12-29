import { ChangeEvent, ReactNode } from "react";
import ModalButton from "../ModalButton/ModalButton";
import styles from "./CommentTextArea.module.css";

interface CommentTextAreaProps {
  value: string;
  id: string;
  children: ReactNode;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string | undefined;
}

function CommentTextArea({ value, onChange, id, placeholder, children, disabled = false }: CommentTextAreaProps) {
  return (
    <>
      <textarea
        value={value}
        id={id}
        onChange={onChange}
        className={styles.textarea}
        placeholder={placeholder}
      ></textarea>
      <ModalButton.ModalSubmit disabled={disabled} className={styles.button}>
        {children}
      </ModalButton.ModalSubmit>
    </>
  );
}

export default CommentTextArea;
