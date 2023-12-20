import { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./TagInput.module.css";

interface ModalPlainTextProp {
  id: string;
  value: string;
  placeholder: string;
  setValue: Dispatch<SetStateAction<string>>;
}

function ModalPlainText({ placeholder, id, value, setValue }: ModalPlainTextProp) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <input className={styles.input} id={id} value={value} onChange={handleChange} placeholder={placeholder} />;
}

export default ModalPlainText;
