import ProfileIcon from "@/components/Members/ProfileIcon";
import useApi from "@/hooks/useApi";
import { CommentData } from "@/types/api.type";
import formatDate from "@/utils/formatDateString";
import { getAccessTokenFromDocument } from "@/utils/getAccessToken";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import AlertModal from "../../AlertModal";
import styles from "./Comment.module.css";

interface CommentProps {
  data: CommentData;
  setData: Dispatch<SetStateAction<CommentData[]>>;
  setEditingId: Dispatch<SetStateAction<number | undefined>>;
}

const Comment = ({ data, setData, setEditingId }: CommentProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const accessToken = getAccessTokenFromDocument("accessToken");

  const handleModalToggle = () => {
    setIsDeleteModalOpen((prevValue) => !prevValue);
  };

  const { wrappedFunction: deleteData } = useApi("delete");

  // 댓글 삭제 기능
  const handleDeleteSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await deleteData({
      path: "comment",
      id: data.id,
      accessToken,
    });

    if (res?.status === 204) {
      setIsDeleteModalOpen(false);
      setData((prev) => prev?.filter((v) => v.id !== data.id));
    }
  };

  const { wrappedFunction: putData } = useApi("put");

  // // 댓글 수정하기
  // const handleEditSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   const res = await putData({
  //     path: "comment",
  //     data: {
  //       content: "",
  //     },
  //     id: data.id,
  //     accessToken,
  //   });
  //   if (res?.status === 200) {
  //   }
  // };
  const handleEditClick = () => {
    setEditingId(data.id);
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
        <div className={styles.comment}>{data.content}</div>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={handleEditClick}>
            수정
          </button>
          <button onClick={handleModalToggle} className={styles.button}>
            삭제
          </button>
          {isDeleteModalOpen && (
            <AlertModal
              alertText="댓글을 삭제하시겠습니까?"
              handleModalClose={handleModalToggle}
              handleSubmit={handleDeleteSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
