import ProfileIcon from "@/components/Members/ProfileIcon";
import useApi from "@/hooks/useApi";
import { CommentData } from "@/types/api.type";
import formatDate from "@/utils/formatDateString";
import { getAccessTokenFromDocument } from "@/utils/getAccessToken";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import AlertModal from "../../AlertModal";
import styles from "./Comment.module.css";
import { MouseEvent, ChangeEvent } from "react";

type Usage = "edit" | "show";

interface CommentProps {
  data: CommentData;
  setCommentList: Dispatch<SetStateAction<CommentData[]>>;
  setEditingId: Dispatch<SetStateAction<number | undefined>>;
  usage: Usage;
  handleEditCancel: (e: MouseEvent) => void;
}

const Comment = ({ data, setCommentList, setEditingId, usage, handleEditCancel }: CommentProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const accessToken = getAccessTokenFromDocument("accessToken");

  // 댓글 삭제 모달 토글
  const handleDeleteModalToggle = () => {
    setIsDeleteModalOpen((prevValue) => !prevValue);
  };

  // 댓글 삭제 기능
  const { wrappedFunction: deleteData } = useApi("delete");

  const handleDeleteSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await deleteData({
      path: "comment",
      id: data.id,
      accessToken,
    });

    if (res?.status === 204) {
      setIsDeleteModalOpen(false);
      setCommentList((prev) => prev?.filter((v) => v.id !== data.id));
    }
  };

  const handleEditClick = () => {
    setEditingId(data.id);
  };

  // 댓글 수정 인풋
  const initialValue = data.content;
  const [editValue, setEditValue] = useState(initialValue);

  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  // 댓글 수정하기

  const { wrappedFunction: putData } = useApi("put");

  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await putData({
      path: "comment",
      data: {
        content: editValue,
      },
      id: data.id as number,
      accessToken,
    });
    if (res?.status === 200) {
      setCommentList((prev) => prev?.map((comment) => (comment.id === data.id ? res.data : comment)));
      setEditingId(undefined);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile_icon}>
        <ProfileIcon size="lg" member={data.author} />
      </div>
      <div className={styles.detail}>
        <div className={styles.header}>
          <span className={styles.author}>{data.author.nickname}</span>
          <span className={styles.createdAt}>{formatDate(data.createdAt, "UTC", "yyyy.MM.dd HH:mm")}</span>
        </div>

        {usage === "edit" && (
          <>
            <input value={editValue} onChange={handleEditInputChange} />
            <div className={styles.buttons}>
              <button className={styles.button} onClick={handleEditSubmit}>
                수정
              </button>
              <button className={styles.button} type="button" onClick={handleEditCancel}>
                취소
              </button>
            </div>
          </>
        )}

        {usage === "show" && (
          <>
            <p className={styles.comment}>{data.content}</p>
            <div className={styles.buttons}>
              <button className={styles.button} onClick={handleEditClick}>
                수정
              </button>
              <button onClick={handleDeleteModalToggle} className={styles.button}>
                삭제
              </button>
              {isDeleteModalOpen && (
                <AlertModal
                  alertText="댓글을 삭제하시겠습니까?"
                  handleModalClose={handleDeleteModalToggle}
                  handleSubmit={handleDeleteSubmit}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
