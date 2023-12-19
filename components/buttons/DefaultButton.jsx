import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";
import Button from "@/components/buttons/Button";

const DefaultButton = ({ children, disabled, onClick, buttonType, withoutSize }) => {
  return (
    <Button
      className={clsx(styles.default)}
      disabled={disabled}
      onClick={onClick}
      buttonType={buttonType}
      withoutSize={withoutSize}
    >
      {children}
    </Button>
  );
};

export default DefaultButton;
