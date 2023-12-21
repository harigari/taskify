import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

type Box = "box1" | "box2" | "box3" | "box4" | "box5" | "box6";
type Color = "violet" | "white" | "gray";

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  box?: Box;
  color?: Color;
}

const Button = ({ children, disabled, onClick, box, color }: Props) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(styles.common, box && styles[box], color && styles[color])}
    >
      {children}
    </button>
  );
};

export default Button;
