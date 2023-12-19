import React from "react";
import styles from "./Button.module.css";
import Button from "@/components/buttons/Button";

const PrimaryButton = ({ children, disabled, onClick, buttonType, withoutSize }) => {
  return (
    <Button
      className={styles.primary}
      disabled={disabled}
      onClick={onClick}
      buttonType={buttonType}
      withoutSize={withoutSize}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
