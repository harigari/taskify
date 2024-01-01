import ImageInput from "@/components/ImageInput/ImageInput";
import Input from "@/components/Input/Input";
import InputWrapper from "@/components/Input/InputWrapper";
import useDropdownController from "@/hooks/useDropdownController";
import useInputController from "@/hooks/useInputController";
import { CardData, ColumnData, Member } from "@/types/api.type";
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

const sortColumnTitle = (columnList: ColumnData[]) => {
  if (columnList) {
    let columnTitleList: string[] = [];
    for (const v of columnList) {
      columnTitleList.push(v.title);
    }

    return columnTitleList;
  }
};

const findColumnId = (columnList: ColumnData[], value: string | undefined): number => {
  if (columnList) {
    let id: number;

    for (const v of columnList) {
      if (v.title === value) {
        id = v.id;

        return id;
      }
    }
  }
};

interface EditInputModalProp {
  title: string;
  buttonText: string;
  setCardList: Dispatch<SetStateAction<CardData[]>>;
  handleModalClose: () => void;
  handleAllModalClose: () => void;
  initialvalue: CardData;
  columnTitle: string;
}

const EditInputModal = ({
  title,
  buttonText,
  handleModalClose,
  handleAllModalClose,
  setCardList,
  initialvalue,
  columnTitle,
}: EditInputModalProp) => {
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

  const [columnList, setColumnList] = useState<ColumnData[]>([]);

  useEffect(() => {
    (async () => {
      const optionRes = await sender.get({ path: "columns", id: dashboardId, accessToken });

      if (optionRes?.status === 200) {
        setColumnList(optionRes.data.data);
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
    options: sortColumnTitle(columnList),
    initialValue: columnTitle,
  });

  useEffect(() => {
    if (assigneeList) {
      modalAssigneeDropdown.setValue(assigneeList.find((v) => v.userId === initialvalue.assignee.id));
    }
  }, [assigneeList]);

  const [tagList, setTagList] = useState<string[]>([...initialvalue.tags].reverse());

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      columnId: findColumnId(columnList, modalColumnDropdown.value),
      dashboardId,
      assigneeUserId: modalAssigneeDropdown.value?.userId as number,
      title: modalTitle.input.value,
      description: modalExplain.input.value,
      dueDate: formatDateString(String(modalDate.dateTime.date), "KOREA", "yyyy-MM-dd HH:mm"),
      tags: tagList,
      imageUrl: initialvalue.imageUrl,
    };

    for (const v of Object.values(data)) {
      if (!v) return;
    }

    const res = await sender.put({ path: "card", id: initialvalue.id, data, accessToken });

    if (res.status < 300) {
      router.push(`/dashboard/${initialvalue.dashboardId}`);
      handleAllModalClose();
    }
  };

  return (
    <ModalWrapper size="sm">
      <form className={styles.form} onSubmit={handleEditSubmit} noValidate>
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
              <ImageInput initialvalue={initialvalue.imageUrl} imageFile={imageFile} setImageFile={setImageFile} />
            </div>
          </div>
        </div>

        <ModalButton.DoubleButton onClick={handleModalClose}>{buttonText}</ModalButton.DoubleButton>
      </form>
    </ModalWrapper>
  );
};
export default EditInputModal;
