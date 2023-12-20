import React from "react";
import styles from "./CreateButton.module.css";
import CreateButton from "@/components/buttons/CreateButton/CreateButton";

const DefaultCreateButton = ({ children, disabled, onClick, purpose }) => {
  return (
    <CreateButton buttonType={styles.default} disabled={disabled} onClick={onClick} purpose={purpose}>
      {children}
    </CreateButton>
  );
};

export default DefaultCreateButton;
