import { InputHTMLAttributes, ReactNode, useState } from "react";
import styles from "./Input.module.css";
import Label from "../Label/Label";

interface InputWrapperProp extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  essential?: boolean;
  errorText?: boolean;
  children: ReactNode;
  htmlFor?: string;
  eyeButton?: boolean;
}

function InputWrapper({ label, htmlFor, essential, errorText, children, onBlur, onFocus }: InputWrapperProp) {
  return (
    <div className={styles.root}>
      <Label htmlFor={htmlFor} essential={essential}>
        {label}
      </Label>
      <div className={styles.wrapper} onBlur={onBlur} onFocus={onFocus}>
        {children}
      </div>
      {errorText && <div className={styles.errorMessage}>{errorText}</div>}
    </div>
  );
}

export default InputWrapper;
