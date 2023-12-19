import { ReactNode } from "react";
import styles from "./LoginButton.module.css";
import clsx from "clsx";

const LoginButton = ({ children, onClick, disabled, size }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(styles.button, disabled && styles.disabled, styles.size)}
    >
      {children}
    </button>
  );
};

export default LoginButton;
