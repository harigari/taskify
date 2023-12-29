import Input from "@/components/Input/Input";
import InputWrapper from "@/components/Input/InputWrapper";
import useInputController from "@/hooks/useInputController";
import ModalWrapper from "./ModalWrapper";
import ModalButton from "@/components/Modal/ModalButton/ModalButton";
import styles from "./Modal.module.css";
import { FormEvent, MouseEvent, useState } from "react";
import DateTime from "@/components/Modal/ModalInput/DateTime";
import TagInput from "@/components/Modal/ModalInput/TagInput";
import ImageInput from "@/components/ImageInput/ImageInput";
import InputDropdown from "@/components/Modal/InputDropdown/InputDropdown";
import useDropdownController, { Member } from "@/hooks/useDropdownController";

interface MultiInputModalProp {
  title: string;
  buttonText: string;
  type?: string;
  columnId: number;
  dashboardId: number;
  handleModalClose: (e: MouseEvent) => void;
}

const MultiInputModal = ({
  type = "text",
  title,
  buttonText,
  handleModalClose,
  columnId,
  dashboardId,
}: MultiInputModalProp) => {
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

  const testOp = [
    {
      id: 1,
      userId: 101,
      email: "user1@example.com",
      nickname: "나란히",
      profileImageUrl: "/icon-addbox.svg",
      createdAt: "2023-01-01T00:00:00",
      updatedAt: "2023-01-01T12:34:56",
      isOwner: true,
    },
    {
      id: 2,
      userId: 102,
      email: "user2@example.com",
      nickname: "가요",
      profileImageUrl: "/icon-addbox.svg",
      createdAt: "2023-01-02T00:00:00",
      updatedAt: "2023-01-02T12:34:56",
      isOwner: false,
    },
    {
      id: 3,
      userId: 103,
      email: "user3@example.com",
      nickname: "룰루",
      profileImageUrl: "/icon-addbox.svg",
      createdAt: "2023-01-03T00:00:00",
      updatedAt: "2023-01-03T12:34:56",
      isOwner: false,
    },
    {
      id: 4,
      userId: 104,
      email: "user4@example.com",
      nickname: "ㅎㅎㅎㅎㄴ",
      profileImageUrl: "/icon-addbox.svg",
      createdAt: "2023-01-04T00:00:00",
      updatedAt: "2023-01-04T12:34:56",
      isOwner: false,
    },
    {
      id: 5,
      userId: 1099,
      email: "user4@example.com",
      nickname: "나민지",
      profileImageUrl: "/icon-addbox.svg",
      createdAt: "2023-01-04T00:00:00",
      updatedAt: "2023-01-04T12:34:56",
      isOwner: false,
    },
  ];

  const modalDropdown = useDropdownController<Member>({ options: testOp });

  const [tagList, setTagList] = useState<string[]>([]);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const data = {
    columnId,
    dashboardId,
    assigneeUserId: modalDropdown.value,
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

          <InputDropdown {...modalDropdown}>담당자</InputDropdown>

          <InputWrapper {...modalTitle.wrapper}>
            <Input {...modalTitle.input} />
          </InputWrapper>

          <InputWrapper {...modalExplain.wrapper}>
            <textarea className={styles.textArea} {...modalExplain.textarea} />
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

        <ModalButton.DoubleButton onClick={handleModalClose}>{buttonText}</ModalButton.DoubleButton>
      </form>
    </ModalWrapper>
  );
};

export default MultiInputModal;
