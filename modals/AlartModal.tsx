import ModalWrapper from "./ModalWrapper";
import ModalButton from "@/components/Modal/ModalButton/ModalButton";
import styles from "./CreateNewColumn.module.css";
import { FormEvent, ReactNode } from "react";

interface AlartModalProp {
  isDoubleButton?: boolean;
  alartText: string;
}

const AlartModal = ({ isDoubleButton = true, alartText }: AlartModalProp) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // 페치 하게 될 듯
  };

  return (
    <ModalWrapper size="md">
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.modal}>
          <p className={styles.info}>{alartText}</p>
        </div>

        {isDoubleButton ? (
          <ModalButton.DoubleButton>삭제</ModalButton.DoubleButton>
        ) : (
          <ModalButton.SingleButton>확인</ModalButton.SingleButton>
        )}
      </form>
    </ModalWrapper>
  );
};

export default AlartModal;
