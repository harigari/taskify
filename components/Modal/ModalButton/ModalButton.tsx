import clsx from "clsx";
import styles from "./ModalButton.module.css";
import { ReactNode } from "react";

function ModalSubmit({ className }: { className?: string }) {
  const singleButtonStyle = clsx(styles.root, styles.single, className);

  return <button className={singleButtonStyle}>입력</button>;
}

interface Config {
  type: "button" | "submit" | "reset" | undefined;
  className: "cancel" | "accept";
  children: ReactNode;
}

function SingleButton({ children }: { children: string }) {
  return (
    <div className={styles.buttonContainer}>
      <button type="submit" className={`${styles.root} ${styles.double} ${styles.accept}`}>
        {children}
      </button>
    </div>
  );
}

function DoubleButton({ children }: { children: ReactNode }) {
  const configs: Config[] = [
    { type: "button", className: "cancel", children: "취소" },
    { type: "submit", className: "accept", children },
  ];

  return (
    <div className={styles.buttonContainer}>
      {configs.map((config) => {
        return (
          <button
            type={config.type}
            className={`${styles.root} ${styles.double} ${styles[config.className]}`}
            key={config.type}
          >
            {config.children}
          </button>
        );
      })}
    </div>
  );
}

const ModalButton = { ModalSubmit, DoubleButton, SingleButton };

export default ModalButton;
