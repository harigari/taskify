import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

// sm: pc : w-8.4 h-3.2 tablet : w-7.2 h-3 mobile : w-10.9 h-2.8 // 모달 버튼
// lg: pc,tablet : w-12 h-4.8 mobile : w-13.8 h-4.2 // 모달 버튼
// full: 로그인 버튼

interface Props {
  buttonType: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  size: string;
}

const Button = ({ buttonType, children, disabled, onClick, size }: Props) => {
  return (
    <button
      onClick={onClick}
      className={clsx(buttonType, styles.common, disabled && styles.disabled, {
        [styles.small]: size === "sm",
        [styles.large]: size === "lg",
        [styles.full]: size === "full",
        [styles.custom]: size === "custom",
      })}
    >
      {children}
    </button>
  );
};

export default Button;
