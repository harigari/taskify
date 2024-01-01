import Input from "@/components/Input/Input";
import InputWrapper from "@/components/Input/InputWrapper";
import useInputController from "@/hooks/useInputController";
import ModalWrapper from "./ModalWrapper";
import ModalButton from "./components/ModalButton/ModalButton";
import styles from "./Modal.module.css";
import { Dispatch, FormEvent, MouseEvent, SetStateAction, useState } from "react";
import DateTime from "./components/ModalInput/DateTime";
import TagInput from "./components/ModalInput/TagInput";
import ImageInput from "@/components/ImageInput/ImageInput";
import InputDropdown from "./components/InputDropdown/InputDropdown";
import useDropdownController from "@/hooks/useDropdownController";
import { CardData, Member } from "@/types/api.type";
import { getAccessTokenFromDocument } from "@/utils/getAccessToken";
import useApi from "@/hooks/useApi";
import formatDateString from "@/utils/formatDateString";
import { multiModalDate, multiModalExplain, multiModalTag, multiModalTitle } from "@/constants/inputConfig";

interface MultiInputModalProp {
  title: string;
  buttonText: string;
  columnId: number;
  dashboardId: number;
  setCardList: Dispatch<SetStateAction<CardData[]>>;
  assigneeList: Member[];
  handleModalClose: () => void;
}

const MultiInputModal = ({
  title,
  buttonText,
  handleModalClose,
  columnId,
  setCardList,
  dashboardId,
  assigneeList,
}: MultiInputModalProp) => {
  const modalTitle = useInputController(multiModalTitle());

  const modalExplain = useInputController(multiModalExplain());

  const modalDate = useInputController(multiModalDate());

  const modalTag = useInputController(multiModalTag());

  const modalDropdown = useDropdownController<Member>({ options: assigneeList });

  const [tagList, setTagList] = useState<string[]>([]);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const data = {
    columnId,
    dashboardId,
    assigneeUserId: modalDropdown.value?.userId!,
    title: modalTitle.input.value,
    description: modalExplain.input.value,
    dueDate: formatDateString(String(modalDate.dateTime.date), "KOREA", "yyyy-MM-dd HH:mm"),
    tags: [...tagList].reverse(),
  };

  const { pending, error, wrappedFunction: postData } = useApi("post");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    for (const value of Object.values(data)) {
      if (!value) return;
    }

    const accessToken = getAccessTokenFromDocument("accessToken");

    if (pending) return;

    if (imageFile === null) {
      const cardRes = await postData({ path: "card", data, accessToken });

      if (cardRes?.status === 201) {
        setCardList((prevValue) => [...prevValue, cardRes.data]);
        handleModalClose();
      }
    }

    if (imageFile !== null) {
      const imageFormData = new FormData();
      imageFormData.append("image", imageFile);

      const imageRes = await postData({
        path: "cardImage",
        id: columnId,
        data: imageFormData,
        accessToken,
      });

      if (!imageRes) return;

      const {
        data: { imageUrl },
      } = imageRes;

      const dataWithImage = { ...data, imageUrl };

      const cardRes = await postData({ path: "card", data: dataWithImage, accessToken });

      if (cardRes?.status === 201) {
        setCardList((prevValue) => [...prevValue, cardRes.data]);
        handleModalClose();
      }
    }
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
