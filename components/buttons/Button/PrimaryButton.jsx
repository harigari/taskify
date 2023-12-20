import React from "react";
import styles from "./Button.module.css";
import Button from "@/components/buttons/Button/Button";

const PrimaryButton = ({ children, disabled, onClick, size }) => {
  return (
    <Button buttonType={styles.primary} disabled={disabled} onClick={onClick} size={size}>
      {children}
    </Button>
  );
};

export default PrimaryButton;
