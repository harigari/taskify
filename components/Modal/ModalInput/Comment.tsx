import { Dispatch, SetStateAction } from "react";
import ModalButton from "../ModalButton/ModalButton";
import styles from "./Comment.module.css";

interface CommentProps {
  value: string;
  id: string;
  setValue: Dispatch<SetStateAction<string>>;
}

function Comment({ value, setValue, id }: CommentProps) {
  return (
    <>
      <textarea
        value={value}
        id={id}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className={styles.textarea}
        placeholder="댓글 작성하기"
      ></textarea>
      <ModalButton.ModalSubmit className={styles.button} />
    </>
  );
}

export default Comment;
