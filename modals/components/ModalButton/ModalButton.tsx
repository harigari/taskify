import clsx from "clsx";
import styles from "./ModalButton.module.css";
import { ReactNode } from "react";

function ModalSubmit({
  children,
  className,
  disabled = false,
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  const singleButtonStyle = clsx(styles.root, styles.single, className);

  return (
    <button type="submit" disabled={disabled} className={singleButtonStyle}>
      {children}
    </button>
  );
}

function SingleButton({
  children,
  onClick,
  disabled = false,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <div className={styles.buttonContainer}>
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={`${styles.root} ${styles.double} ${styles.accept}`}
      >
        {children}
      </button>
    </div>
  );
}

function DoubleButton({
  children,
  onClick,
  disabled = false,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <div className={styles.buttonContainer}>
      <button onClick={onClick} type="button" className={`${styles.root} ${styles.double} ${styles.cancel}`}>
        취소
      </button>
      <button type="submit" disabled={disabled} className={`${styles.root} ${styles.double} ${styles.accept}`}>
        {children}
      </button>
    </div>
  );
}

const ModalButton = { ModalSubmit, DoubleButton, SingleButton };

export default ModalButton;
