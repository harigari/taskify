import React from "react";
import styles from "./CreateButton.module.css";
import clsx from "clsx";

const CreateButton = ({ buttonType, children, disabled, onClick, size }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(buttonType, styles.common, disabled && styles.disabled, {
        [styles.large]: size === "lg",
        [styles.full]: size === "full",
        [styles.custom]: size === "custom",
      })}
    >
      {children}
    </button>
  );
};

export default CreateButton;
