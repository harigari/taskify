import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

const Button = ({ className, children, disabled, onClick, buttonType, withoutSize }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(className, styles.common, disabled && styles.disabled, styles.custom && withoutSize, {
        [styles.small]: buttonType === "sm",
        [styles.large]: buttonType === "lg",
        [styles.full]: buttonType === "full",
      })}
    >
      {children}
    </button>
  );
};

export default Button;
