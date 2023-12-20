import React from "react";
import styles from "./CreateButton.module.css";
import CreateButton from "@/components/buttons/CreateButton/CreateButton";

const DefaultCreateButton = ({ children, disabled, onClick, size }) => {
  return (
    <CreateButton buttonType={styles.default} disabled={disabled} onClick={onClick} size={size}>
      {children}
    </CreateButton>
  );
};

export default DefaultCreateButton;
