import clsx from "clsx";
import styles from "./ModalButton.module.css";
import { MouseEvent, ReactNode } from "react";

function ModalSubmit({ children, className }: { children: string; className?: string }) {
  const singleButtonStyle = clsx(styles.root, styles.single, className);

  return <button className={singleButtonStyle}>{children}</button>;
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

function DoubleButton({ children, onClick }: { children: ReactNode; onClick: (e: MouseEvent) => void }) {
  return (
    <div className={styles.buttonContainer}>
      <button onClick={onClick} type="button" className={`${styles.root} ${styles.double} ${styles.cancel}`}>
        취소
      </button>
      <button className={`${styles.root} ${styles.double} ${styles.accept}`}>{children}</button>
    </div>
  );
}

const ModalButton = { ModalSubmit, DoubleButton, SingleButton };

export default ModalButton;
