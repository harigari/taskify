import Input from "@/components/Input/Input";
import InputWrapper from "@/components/Input/InputWrapper";
import useInputController from "@/hooks/useInputController";
import ModalWrapper from "./ModalWrapper";
import ModalButton from "@/components/Modal/ModalButton/ModalButton";
import styles from "./Modal.module.css";
import { FormEvent, MouseEvent } from "react";
import ChipColors from "@/components/Chips/ChipColors/ChipColors";
import clsx from "clsx";

interface SingleInputModalProp {
  id: string;
  labelName: string;
  title: string;
  buttonText: string;
  type?: string;
  initialValue?: string;
  chip?: boolean;
  deleteButton?: boolean;
  handleModalClose: (e: MouseEvent) => void;
}

const SingleInputModal = ({
  id,
  type = "text",
  labelName,
  title,
  chip = false,
  buttonText,
  handleModalClose,
  initialValue = "",
  deleteButton = false,
}: SingleInputModalProp) => {
  const column = useInputController({
    inputConfig: { id, type, initialValue },
    labelConfig: { labelName },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // 페치 하게 될 듯
  };

  return (
    <ModalWrapper size="md">
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.modal}>
          <div className={styles.modalTitle}>{title}</div>

          <InputWrapper {...column.wrapper}>
            <Input {...column.input} />
          </InputWrapper>
        </div>

        {chip && <ChipColors size="lg" />}

        <div className={clsx(styles.buttonContainer, deleteButton && styles.deleteButton)}>
          <button className={clsx(styles.button, deleteButton || styles.deleteButton)} type="button">
            삭제하기
          </button>
          <ModalButton.DoubleButton onClick={handleModalClose}>{buttonText}</ModalButton.DoubleButton>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default SingleInputModal;
