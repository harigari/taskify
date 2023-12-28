import { ChangeEvent, Dispatch, SetStateAction } from "react";
import ModalButton from "../ModalButton/ModalButton";
import styles from "./CommentInput.module.css";

interface CommentProps {
  value: string;
  id: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string | undefined;
  disabled?: boolean;
}

function CommentInput({ value, onChange, id, placeholder, disabled = false }: CommentProps) {
  return (
    <>
      <textarea
        value={value}
        id={id}
        onChange={onChange}
        className={styles.textarea}
        placeholder={placeholder}
      ></textarea>
      <ModalButton.ModalSubmit disabled={disabled} className={styles.button} />
    </>
  );
}

export default CommentInput;
