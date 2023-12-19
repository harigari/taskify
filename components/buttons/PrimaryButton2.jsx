import React from "react";
import styles from "./PrimaryButton2.module.css";
import clsx from "clsx";

const PrimaryButton2 = ({ children, onClick, size, color }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(styles[color], { [styles.small]: size === "small", [styles.large]: size === "large" })}
    >
      {children}
    </button>
  );
};

export default PrimaryButton2;
