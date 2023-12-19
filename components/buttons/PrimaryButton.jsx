import React from "react";
import styles from "./PrimaryButton.module.css";
import clsx from "clsx";

const PrimaryButton = ({ children, disabled, onClick, size }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(styles.common, disabled && styles.disabled, {
        [styles.small]: size === "small",
        [styles.large]: size === "large",
        [styles.full]: size === "full",
      })}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
