import Input from "@/components/Input/Input";
import InputWrapper from "@/components/Input/InputWrapper";
import useInputController from "@/hooks/useInputController";
import ModalWrapper from "./ModalWrapper";
import ModalButton from "@/components/Modal/ModalButton/ModalButton";
import styles from "./Modal.module.css";
import { FormEvent, useState } from "react";
import DateTime from "@/components/Modal/ModalInput/DateTime";
import TagInput from "@/components/Modal/ModalInput/TagInput";
import ImageInput from "@/components/ImageInput/ImageInput";

interface MultiInputModalProp {
  title: string;
  buttonText: string;
  type?: string;
  chip?: boolean;
  columnId: number;
  dashboardId: number;
}

const MultiInputModal = ({ type = "text", title, buttonText, columnId, dashboardId }: MultiInputModalProp) => {
  const modalTitle = useInputController({
    inputConfig: { id: "title", type, placeholder: "제목을 입력해 주세요" },
    labelConfig: { labelName: "제목", star: true, mobile: true },
  });

  const modalExplain = useInputController({
    inputConfig: { id: "comment", type, placeholder: "설명을 입력해 주세요" },
    labelConfig: { labelName: "설명", star: true, mobile: true },
  });

  const modalDate = useInputController({
    inputConfig: { id: "date", type, placeholder: "날짜를 입력해 주세요" },
    labelConfig: { labelName: "마감일", mobile: true },
  });

  const modalTag = useInputController({
    inputConfig: { id: "tag", type, placeholder: "입력 후 Enter" },
    labelConfig: { labelName: "태그", mobile: true },
  });

  const [tagList, setTagList] = useState<string[]>([]);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const data = {
    assigneeUserId: 0,
    columnId,
    dashboardId,
    title: modalTitle.input.value,
    description: modalExplain.input.value,
    dueDate: modalTag.input.value,
    tags: tagList,
    imageUrl: imageFile,
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // 페치 하게 될 듯
  };

  return (
    <ModalWrapper size="sm">
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.modal}>
          <div className={styles.modalTitle}>{title}</div>

          <InputWrapper {...modalTitle.wrapper}>
            <Input {...modalTitle.input} />
          </InputWrapper>

          <InputWrapper {...modalExplain.wrapper}>
            <textarea className={styles.textArea} {...modalExplain.input} />
          </InputWrapper>

          <InputWrapper {...modalDate.wrapper}>
            <DateTime {...modalDate.dateTime} />
          </InputWrapper>

          <InputWrapper {...modalTag.wrapper}>
            <TagInput {...modalTag.input} tagList={tagList} setTagList={setTagList} />
          </InputWrapper>

          <div>
            <div className={styles.imageFileInputTitle}>이미지</div>
            <ImageInput imageFile={imageFile} setImageFile={setImageFile} />
          </div>
        </div>

        <ModalButton.DoubleButton>{buttonText}</ModalButton.DoubleButton>
      </form>
    </ModalWrapper>
  );
};

export default MultiInputModal;
