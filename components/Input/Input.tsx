import { ChangeEvent, Dispatch, HTMLInputTypeAttribute, InputHTMLAttributes, SetStateAction } from "react";
import styles from "./Input.module.css";
import Image from "next/image";

interface InputProp {
  id: string;
  value: string;
  type: string;
  placeholder?: string | undefined;
  eyeButton?: boolean;
  eyesValue?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setEyesValue: Dispatch<SetStateAction<boolean>>;
}

function Input({ placeholder, id, value, onChange, eyeButton, eyesValue, type = "text", setEyesValue }: InputProp) {
  function handleEyesClick() {
    setEyesValue((current) => !current);
  }

  if (eyesValue) {
    type = "text";
  }

  return (
    <>
      <input className={styles.input} type={type} id={id} value={value} onChange={onChange} placeholder={placeholder} />
      {eyeButton && (
        <button className={styles.eyes} onClick={handleEyesClick} type="button">
          <Image src={`/images/icons/eyes${eyesValue ? "On" : "Off"}.svg`} width={18} height={18} alt="" />
        </button>
      )}
    </>
  );
}

export default Input;
