import React from "react";
import styles from "./DeleteDashBoardButton.module.css";
import clsx from "clsx";

const DeleteDashBoardButton = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={clsx(styles.delete_button)}>
      {children}
    </button>
  );
};

export default DeleteDashBoardButton;
