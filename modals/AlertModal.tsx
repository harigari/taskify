import ModalWrapper from "./ModalWrapper";
import ModalButton from "./components/ModalButton/ModalButton";
import styles from "./Modal.module.css";
import { FormEvent, MouseEvent } from "react";

interface AlertModalProp {
  isDoubleButton?: boolean;
  alertText: string;
  handleModalClose: (e: MouseEvent) => void;
}

const AlertModal = ({ isDoubleButton = true, alertText, handleModalClose }: AlertModalProp) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // 페치 하게 될 듯
  };

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
