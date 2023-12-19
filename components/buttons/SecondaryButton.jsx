import React from "react";
import styles from "./SecondaryButton.module.css";
import clsx from "clsx";

const SecondaryButton = ({ children, onClick, size, color }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(styles.common, styles[color], { [styles.small]: size === "sm", [styles.large]: size === "lg" })}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
