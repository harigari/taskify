import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

const Button = ({ buttonType, children, disabled, onClick, size, withoutSize }) => {
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
