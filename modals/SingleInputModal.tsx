import ChipColors from "@/components/Chips/ChipColors/ChipColors";
import Input from "@/components/Input/Input";
import InputWrapper from "@/components/Input/InputWrapper";
import clsx from "clsx";
import { FormEvent, MouseEvent } from "react";
import styles from "./Modal.module.css";
import ModalWrapper from "./ModalWrapper";
import ModalButton from "./components/ModalButton/ModalButton";

interface SingleInputModalProp {
  title: string;
  buttonText: string;
  onSubmit: (e: FormEvent) => void;
  chip?: boolean;
  deleteButton?: boolean;
  handleModalClose: (e: MouseEvent) => void;
  inputController: any;
  disabled?: boolean;
}

const SingleInputModal = ({
  title,
  chip = false,
  buttonText,
  onSubmit,
  inputController,
  handleModalClose,
  deleteButton = false,
  disabled,
}: SingleInputModalProp) => {
  return (
    <ModalWrapper size="md">
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.modal}>
          <div className={styles.modalTitle}>{title}</div>

          <InputWrapper {...inputController.wrapper}>
            <Input {...inputController.input} />
          </InputWrapper>
        </div>

        {chip && <ChipColors size="lg" />}

        <div className={clsx(styles.buttonContainer, deleteButton && styles.deleteButton)}>
          <button className={clsx(styles.button, deleteButton || styles.deleteButton)} type="button">
            삭제하기
          </button>

          <ModalButton.DoubleButton disabled={disabled} onClick={handleModalClose}>
            {buttonText}
          </ModalButton.DoubleButton>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default SingleInputModal;
