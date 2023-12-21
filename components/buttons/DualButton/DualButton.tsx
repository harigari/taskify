import React from "react";
import styles from "./DualButton.module.css";
import clsx from "clsx";

interface Props {
  onClick: () => void;
}
const DualButton = ({ onClick }: Props) => {
  return (
    <>
      <button onClick={onClick} className={clsx(styles.button)}>
        수락
      </button>
      <button onClick={onClick} className={clsx(styles.button)}>
        수락
      </button>
    </>
  );
};

export default DualButton;
