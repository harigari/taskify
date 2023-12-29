import clsx from "clsx";
import styles from "./ModalButton.module.css";
import { ReactNode } from "react";

function ModalSubmit({ children, className }: { children: ReactNode; className?: string }) {
  const singleButtonStyle = clsx(styles.root, styles.single, className);

  return (
    <button type="submit" className={singleButtonStyle}>
      {children}
    </button>
  );
}

function SingleButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <div className={styles.buttonContainer}>
      <button type="button" onClick={onClick} className={`${styles.root} ${styles.double} ${styles.accept}`}>
        {children}
      </button>
    </div>
  );
}

function DoubleButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <div className={styles.buttonContainer}>
      <button onClick={onClick} type="button" className={`${styles.root} ${styles.double} ${styles.cancel}`}>
        취소
      </button>
      <button type="submit" className={`${styles.root} ${styles.double} ${styles.accept}`}>
        {children}
      </button>
    </div>
  );
}

const ModalButton = { ModalSubmit, DoubleButton, SingleButton };

export default ModalButton;
