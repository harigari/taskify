import Image from "next/image";
import { ChangeEvent, ForwardedRef, MouseEvent, MutableRefObject, forwardRef } from "react";
import styles from "./Input.module.css";

type RefProps = "email" | "nickname" | "password" | "passwordCheck";
type RefValue = HTMLElement | null;
type Ref = {
  [key in RefProps]: RefValue;
};

interface InputProp {
  id: string;
  value: string;
  type: string;
  name?: RefProps;
  placeholder?: string | undefined;
  eyeButton?: boolean;
  eyesValue?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onEyesClick: (e: MouseEvent<HTMLButtonElement>) => void;
  inputRef?: MutableRefObject<Ref>;
}
function Input({
  placeholder,
  id,
  name = "email",
  value,
  onChange,
  eyeButton,
  eyesValue,
  type = "text",
  onEyesClick,
  inputRef,
}: InputProp) {
  return (
    <>
      <input
        ref={(el) => {
          if (!inputRef) return;
          inputRef.current[name] = el;
        }}
        className={styles.input}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {eyeButton && (
        <button className={styles.eyes} onClick={onEyesClick} type="button">
          <Image src={`/icons/eyes${eyesValue ? "On" : "Off"}.svg`} width={18} height={18} alt="" />
        </button>
      )}
    </>
  );
}

export default Input;
