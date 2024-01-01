import ImageInput from "@/components/ImageInput/ImageInput";
import Input from "@/components/Input/Input";
import InputWrapper from "@/components/Input/InputWrapper";
import useDropdownController from "@/hooks/useDropdownController";
import useInputController from "@/hooks/useInputController";
import { CardData, Member } from "@/types/api.type";
import formatDateString from "@/utils/formatDateString";
import { getAccessTokenFromDocument } from "@/utils/getAccessToken";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import styles from "./Modal.module.css";
import ModalWrapper from "./ModalWrapper";
import InputDropdown from "./components/InputDropdown/InputDropdown";
import ModalButton from "./components/ModalButton/ModalButton";
import DateTime from "./components/ModalInput/DateTime";
import TagInput from "./components/ModalInput/TagInput";
import sender from "@/apis/sender";
import Dropdown from "./components/Dropdown/Dropdown";
import { multiModalDate, multiModalExplain, multiModalTag, multiModalTitle } from "@/constants/inputConfig";

interface EditInputModalProp {
  title: string;
  buttonText: string;
  setCardList: Dispatch<SetStateAction<CardData[]>>;
  handleModalClose: () => void;
  initialvalue: CardData;
}

const EditInputModal = ({ title, buttonText, handleModalClose, setCardList, initialvalue }: EditInputModalProp) => {
  const columnId = initialvalue.columnId;
  const router = useRouter();
  const dashboardId = Number(router.query.boardId);
  const accessToken = getAccessTokenFromDocument("accessToken");

  const [assigneeList, setAssigneeList] = useState<Member[]>();
  useEffect(() => {
    (async () => {
      const res = await sender.get({ path: "members", id: dashboardId, accessToken });

      if (res.status < 300) {
        setAssigneeList(res.data.members);
      }
    })();
  }, []);

  const modalTitle = useInputController(multiModalTitle(initialvalue.title));
  const modalExplain = useInputController(multiModalExplain(initialvalue.description));
  const modalDate = useInputController(multiModalDate(initialvalue.dueDate));
  const modalTag = useInputController(multiModalTag());

  const modalAssigneeDropdown = useDropdownController({
    options: assigneeList,
  });

  const modalColumnDropdown = useDropdownController({
    options: ["to do", "to done", "task"],
    initialValue: "to do",
  });

  console.log("렌더링");
  useEffect(() => {
    if (assigneeList) {
      modalAssigneeDropdown.setValue(assigneeList.find((v) => v.userId === initialvalue.assignee.id));
    }
  }, [assigneeList]);

  const [tagList, setTagList] = useState<string[]>([...initialvalue.tags].reverse());

  const [imageFile, setImageFile] = useState<File | null>(null);

  const data = {
    columnId,
    dashboardId,
    assigneeUserId: modalAssigneeDropdown.value?.userId!,
    title: modalTitle.input.value,
    description: modalExplain.input.value,
    dueDate: formatDateString(String(modalDate.dateTime.date), "KOREA", "yyyy-MM-dd HH:mm"),
    tags: tagList,
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <ModalWrapper size="sm">
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.modal}>
          <div className={styles.modalTitle}>{title}</div>
          <div className={styles.dropdownContainer}>
            <Dropdown {...modalColumnDropdown}>상태</Dropdown>
            <InputDropdown {...modalAssigneeDropdown}>담당자</InputDropdown>
          </div>
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
            <div className={styles.imageFileInput}>
              {initialvalue.imageUrl ? (
                <div className={styles.currentImage}>
                  <Image fill src={initialvalue.imageUrl} alt="현재 등록되어 있는 할 일 이미지" />
                </div>
              ) : null}
              <ImageInput imageFile={imageFile} setImageFile={setImageFile} />
            </div>
          </div>
        </div>

        <ModalButton.DoubleButton onClick={handleModalClose}>{buttonText}</ModalButton.DoubleButton>
      </form>
    </ModalWrapper>
  );
};
export default EditInputModal;
