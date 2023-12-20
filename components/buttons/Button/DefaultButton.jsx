import React from "react";
import styles from "./Button.module.css";
import Button from "@/components/buttons/Button/Button";

const DefaultButton = ({ children, disabled, onClick, size }) => {
  return (
    <Button buttonType={styles.default} disabled={disabled} onClick={onClick} size={size}>
      {children}
    </Button>
  );
};

export default DefaultButton;
