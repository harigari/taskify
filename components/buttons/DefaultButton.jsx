import React from "react";
import styles from "./Button.module.css";
import Button from "@/components/buttons/Button";

const DefaultButton = ({ children, disabled, onClick, size, withoutSize }) => {
  return (
    <Button
      buttonType={styles.default}
      disabled={disabled}
      onClick={onClick}
      size={size}
      withoutSize={withoutSize}
    >
      {children}
    </Button>
  );
};

export default DefaultButton;
