import { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./Input.module.css";

interface InputProp {
  id: string;
  value: string;
  placeholder: string;
  setValue: Dispatch<SetStateAction<string>>;
}

function Input({ placeholder, id, value, setValue }: InputProp) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <input className={styles.input} id={id} value={value} onChange={handleChange} placeholder={placeholder} />;
}

export default Input;
