import React from "react";
import styles from "./CreateButton.module.css";
import clsx from "clsx";

interface Props {
  buttonType: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  purpose: string;
}

const CreateButton = ({ buttonType, children, disabled, onClick, purpose }: Props) => {
  return (
    <button
      onClick={onClick}
      className={clsx(buttonType, styles.common, disabled && styles.disabled, {
        [styles.column]: purpose === "column",
        [styles.plus]: purpose === "plus",
        [styles.dashboard]: purpose === "dashboard",
      })}
    >
      {children}
    </button>
  );
};

export default CreateButton;
