import { ChangeEvent, ReactNode } from "react";
import ModalButton from "../ModalButton/ModalButton";
import styles from "./CommentInput.module.css";

interface CommentInputProps {
  value: string;
  id: string;
  children: ReactNode;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string | undefined;
  disabled?: boolean;
}

function CommentInput({ value, onChange, id, placeholder, children, disabled }: CommentInputProps) {
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

export default CommentInput;
