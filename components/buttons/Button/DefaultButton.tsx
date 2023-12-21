import React from "react";
import styles from "./Button.module.css";
import Button from "@/components/buttons/Button/Button";
interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  size: "sm" | "lg" | "full" | "custom";
}

const DefaultButton = ({ children, disabled, onClick, size }: Props) => {
  return (
    <Button buttonType={styles.default} disabled={disabled} onClick={onClick} size={size}>
      {children}
    </Button>
  );
};

export default DefaultButton;
