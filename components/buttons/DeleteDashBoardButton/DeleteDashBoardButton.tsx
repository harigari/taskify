import React from "react";
import styles from "./DeleteDashBoardButton.module.css";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}
const DeleteDashBoardButton = ({ children, onClick }: Props) => {
  return (
    <button onClick={onClick} className={clsx(styles.delete_button)}>
      {children}
    </button>
  );
};

export default DeleteDashBoardButton;
