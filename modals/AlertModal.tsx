import { FormEvent, MouseEvent } from "react";
import styles from "./Modal.module.css";
import ModalWrapper from "./ModalWrapper";
import ModalButton from "./components/ModalButton/ModalButton";

interface AlertModalProp {
  isDoubleButton?: boolean;
  alertText: string;
  handleModalClose: (e: MouseEvent) => void;
  handleSubmit?: (e: FormEvent) => void;
}

const AlertModal = ({ isDoubleButton = true, alertText, handleModalClose, handleSubmit }: AlertModalProp) => {
  return (
    <ModalWrapper size="md">
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.modal}>
          <p className={styles.info}>{alertText}</p>
        </div>

        {isDoubleButton ? (
          <ModalButton.DoubleButton onClick={handleModalClose}>삭제</ModalButton.DoubleButton>
        ) : (
          <ModalButton.SingleButton>확인</ModalButton.SingleButton>
        )}
      </form>
    </ModalWrapper>
  );
};

export default AlertModal;
