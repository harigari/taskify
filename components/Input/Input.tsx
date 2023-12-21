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
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onEyesClick: (e: MouseEvent<HTMLButtonElement>) => void;
  typeChanger: () => string;
}

function Input({
  placeholder,
  id,
  value,
  onChange,
  eyeButton,
  eyesValue,
  type = "text",
  onEyesClick,
  typeChanger,
}: InputProp) {
  // 눈깔찌르기를 통해 state가 변경되면 아래의 if문이 실행되는데, eyesValue가 true면 type 프롭 값을 강제로 "text"로 변경한다.
  type = typeChanger();

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
