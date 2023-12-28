import { InputHTMLAttributes, ReactNode } from "react";
import styles from "./Input.module.css";
import Label from "../Label/Label";
import clsx from "clsx";

interface InputWrapperProp extends InputHTMLAttributes<HTMLInputElement> {
  labelName?: string;
  children: ReactNode;
  star?: boolean;
  errorText?: string;
  htmlFor?: string;
  mobile?: boolean;
  eyeButton?: boolean;
}

function InputWrapper({ labelName, htmlFor, star, mobile, errorText, children, onBlur, onFocus }: InputWrapperProp) {
  const wrapperStyle = clsx(
    styles.wrapper,
    htmlFor === "comment" && styles.commentWrapper,
    errorText && styles.errorBorder
  );

  return (
    <div className={styles.root}>
      <Label htmlFor={htmlFor} star={star} mobile={mobile}>
        {labelName}
      </Label>
      <div className={wrapperStyle} onBlur={onBlur} onFocus={onFocus}>
        {children}
      </div>
      {errorText && <div className={styles.errorMessage}>{errorText}</div>}
    </div>
  );
}

export default InputWrapper;
