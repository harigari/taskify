import clsx from "clsx";
import styles from "./ModalButton.module.css";

function ModalSubmit({ className, disabled }: { className?: string; disabled?: boolean }) {
  const singleButtonStyle = clsx(styles.root, styles.single, className);

  return (
    <button disabled={disabled} className={singleButtonStyle}>
      입력
    </button>
  );
}

function DoubleButton({ children }: { children: string }) {
  const configs = [
    { className: "cancel", children: "취소" },

    { className: "accept", children },
  ];

  return (
    <div className={styles.buttonContainer}>
      {configs.map((config) => {
        return (
          <button className={`${styles.root} ${styles.double} ${styles[config.className]}`} key={config.children}>
            {config.children}
          </button>
        );
      })}
    </div>
  );
}

const ModalButton = { ModalSubmit, DoubleButton };

export default ModalButton;
