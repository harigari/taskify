import ImageInput from "@/components/ImageInput/ImageInput";
import Input from "@/components/Input/Input";
import InputWrapper from "@/components/Input/InputWrapper";
import useDropdownController from "@/hooks/useDropdownController";
import useInputController from "@/hooks/useInputController";
import { CardData, ColumnData, EntireData, Member } from "@/types/api.type";
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
import useApi from "@/hooks/useApi";
import changeImageFileToURL from "@/utils/changeImageFileToURL";
import { useAtomValue } from "jotai";
import { accessTokenAtom } from "@/atoms/atoms";
import { useQuery } from "@tanstack/react-query";

const sortColumnTitle = (columnList: ColumnData[]) => {
  if (columnList) {
    let columnTitleList: string[] = [];
    for (const v of columnList) {
      columnTitleList.push(v.title);
    }

    return columnTitleList;
  }
};

const findColumnId = (columnList: ColumnData[], value: string | undefined) => {
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
  setEntireList: Dispatch<SetStateAction<EntireData>>;
  handleModalClose: () => void;
  initialvalue: CardData;
  columnTitle: string;
}

const EditInputModal = ({
  title,
  buttonText,
  handleModalClose,
  setEntireList,
  initialvalue,
  columnTitle,
}: EditInputModalProp) => {
  const [assignee, setAssignee] = useState<Member>();
  const columnId = initialvalue.columnId;
  const router = useRouter();
  const dashboardId = Number(router.query.boardId);

  const accessToken = useAtomValue(accessTokenAtom);

  const assignees = useQuery({
    queryKey: ["member", dashboardId],
    queryFn: () => sender.get({ path: "members", id: dashboardId, accessToken }),
  });

  const assigneeList = assignees.data?.data.members ?? [];

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
      setAssignee(assigneeList.find((v) => v.userId === initialvalue?.assignee?.id));
    }
  }, [assigneeList]);

  const [tagList, setTagList] = useState<string[]>([...initialvalue.tags].reverse());

  const [imageFile, setImageFile] = useState<File | null>(null);

  const data = {
    columnId: findColumnId(columnList, modalColumnDropdown.value) as number,
    dashboardId,
    assigneeUserId: assignee?.userId!,
    title: modalTitle.input.value,
    description: modalExplain.input.value,
    dueDate: formatDateString(String(modalDate.dateTime.date), "KOREA", "yyyy-MM-dd HH:mm"),
    tags: [...tagList].reverse(),
    imageUrl: initialvalue.imageUrl,
  };

  const { pending, wrappedFunction: putData } = useApi("put");

  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (imageFile === null) {
      const cardNoImageRes = await putData({ path: "card", id: initialvalue.id, data, accessToken });

      if (cardNoImageRes?.status === 200) {
        handleModalClose();

        const editedCard = cardNoImageRes.data;
        const newColumnId = editedCard.columnId;
        const prevColumnId = initialvalue.columnId;

        if (prevColumnId === newColumnId) {
          setEntireList((prev) => ({
            ...prev,
            cards: {
              ...prev.cards,
              [newColumnId]: prev.cards[newColumnId].map((v) => (v.id === editedCard.id ? editedCard : v)),
            },
          }));
          return;
        }

        setEntireList((prev) => ({
          ...prev,
          cards: {
            ...prev.cards,
            [prevColumnId]: prev.cards[prevColumnId].filter((v) => v.id !== editedCard.id),
            [newColumnId]:
              (prev.cards[newColumnId].push(editedCard),
              prev.cards[newColumnId].sort((a, b) => Number(new Date(a.createdAt)) - Number(new Date(b.createdAt)))),
          },
        }));
      }
    }

    if (imageFile !== null) {
      const imageUrl = await changeImageFileToURL(imageFile, columnId, accessToken);

      const dataWithImage = { ...data, imageUrl };

      const cardWithImageRes = await putData({ path: "card", id: initialvalue.id, data: dataWithImage, accessToken });

      if (cardWithImageRes?.status === 200) {
        handleModalClose();

        const editedCard = cardWithImageRes.data;
        const columnId = editedCard.columnId;
        setEntireList((prev) => ({
          ...prev,
          cards: {
            ...prev.cards,
            [columnId]: prev.cards[columnId].map((v) => (v.id === editedCard.id ? editedCard : v)),
          },
        }));
      }
    }
  };

  return (
    <ModalWrapper handleModalClose={handleModalClose} size="sm">
      <form className={styles.form} onSubmit={handleEditSubmit} noValidate>
        <div className={styles.modal}>
          <div className={styles.modalTitle}>{title}</div>
          <div className={styles.dropdownContainer}>
            <Dropdown {...modalColumnDropdown}>상태</Dropdown>
            <InputDropdown options={assigneeList} value={assignee} setValue={setAssignee}>
              담당자
            </InputDropdown>
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

        <ModalButton.DoubleButton
          disabled={pending || !modalTitle.input.value || !modalExplain.textarea.value || !modalDate.dateTime.date}
          onClick={handleModalClose}
        >
          {buttonText}
        </ModalButton.DoubleButton>
      </form>
    </ModalWrapper>
  );
};

export default EditInputModal;
