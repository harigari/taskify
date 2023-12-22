import { ChangeEvent, Dispatch, HTMLInputTypeAttribute, InputHTMLAttributes, MouseEvent, SetStateAction } from "react";
import styles from "./Input.module.css";
import Image from "next/image";

interface InputProp {
  id: string;
  value: string;
  type: string;
  placeholder?: string | undefined;
  eyeButton?: boolean;
  eyesValue?: boolean;
  onChange: (e: ChangeEvent) => void;
  onEyesClick: (e: MouseEvent<HTMLButtonElement>) => void;
  typeChanger: (type: string) => string;
}

function Input({ placeholder, id, value, onChange, eyeButton, eyesValue, type = "text", onEyesClick }: InputProp) {
  return (
    <>
      <input className={styles.input} type={type} id={id} value={value} onChange={onChange} placeholder={placeholder} />
      {eyeButton && (
        <button className={styles.eyes} onClick={onEyesClick} type="button">
          <Image src={`/images/icons/eyes${eyesValue ? "On" : "Off"}.svg`} width={18} height={18} alt="" />
        </button>
      )}
    </>
  );
}

export default Input;
