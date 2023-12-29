import React, { MouseEvent, ReactNode } from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

export type ButtonType =
  | "login"
  | "delete"
  | "add_column"
  | "plus_icon"
  | "dashboard"
  | "accept_reject"
  | "dashboard_delete";

type Color = "violet" | "white" | "gray";

interface Props {
  children: ReactNode;
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
  buttonType: ButtonType;
  color: Color;
}

const Button = ({ children, disabled, onClick, buttonType, color }: Props) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(styles.common, buttonType && styles[buttonType], color && styles[color])}
    >
      {children}
    </button>
  );
};

export default Button;
