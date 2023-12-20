import React from "react";
import styles from "./CreateButton.module.css";
import CreateButton from "@/components/buttons/CreateButton/CreateButton";
interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  purpose: string;
}

const DefaultCreateButton = ({ children, disabled, onClick, purpose }: Props) => {
  return (
    <CreateButton buttonType={styles.default} disabled={disabled} onClick={onClick} purpose={purpose}>
      {children}
    </CreateButton>
  );
};

export default DefaultCreateButton;
