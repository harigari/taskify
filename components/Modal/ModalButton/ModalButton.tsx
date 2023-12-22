import clsx from "clsx";
import styles from "./ModalButton.module.css";

interface ModalSubmitProps {
  className?: string;
}

function ModalSubmit({ className }: ModalSubmitProps) {
  const singleButtonStyle = clsx(styles.root, styles.single, className);

  return <button className={singleButtonStyle}>입력</button>;
}

function DoubleButton() {
  return (
    <div className={styles.buttonContainer}>
      <button className={`${styles.root} ${styles.double} ${styles.cancel}`}>취소</button>
      <button className={`${styles.root} ${styles.double} ${styles.accept}`}>확인</button>
    </div>
  );
}

const ModalButton = { ModalSubmit, DoubleButton };

export default ModalButton;
