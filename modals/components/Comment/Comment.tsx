import ProfileIcon from "@/components/Members/ProfileIcon";
import useApi from "@/hooks/useApi";
import { CommentData } from "@/types/api.type";
import formatDate from "@/utils/formatDateString";
import { getAccessTokenFromDocument } from "@/utils/getAccessToken";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import AlertModal from "@/modals/AlertModal";
import styles from "./Comment.module.css";
import { MouseEvent, ChangeEvent } from "react";
import clsx from "clsx";
import sender from "@/apis/sender";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Usage = "edit" | "show";

interface CommentProps {
  data: CommentData;
  setEditingId: Dispatch<SetStateAction<number | undefined>>;
  usage: Usage;
  cardId: number;
}

const Comment = ({ data, setEditingId, cardId, usage }: CommentProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const accessToken = getAccessTokenFromDocument("accessToken");

  // 댓글 수정 인풋
  const initialValue = data.content;
  const [editValue, setEditValue] = useState(initialValue);

  const queryClient = useQueryClient();

  const commentMutation = useMutation({
    mutationFn: (mutateType: string) => {
      if (mutateType === "delete") {
        return sender.delete({ path: "comment", id: data.id, accessToken });
      } else {
        return sender.put({
          path: "comment",
          data: {
            content: editValue,
          },
          id: data.id as number,
          accessToken,
        });
      }
    },
    onSuccess: (data, mutateType) => {
      queryClient.invalidateQueries({ queryKey: ["comments", cardId] });

      if (mutateType === "put") {
        setEditingId(undefined);
      }
    },
  });

  // 댓글 삭제 모달 토글
  const handleDeleteModalToggle = () => {
    setIsDeleteModalOpen((prevValue) => !prevValue);
  };

  // 댓글 삭제 기능
  const { wrappedFunction: deleteData } = useApi("delete");

  const handleDeleteSubmit = async (e: FormEvent) => {
    e.preventDefault();
    commentMutation.mutate("delete");
  };

  const handleEditClick = () => {
    setEditingId(data.id);
  };

  const handleEditInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditValue(e.target.value);
  };

  // 댓글 수정하기
  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault();
    commentMutation.mutate("put");
  };

  const userData = useQuery({
    queryKey: ["user"],
    queryFn: () => sender.get({ path: "me", accessToken: accessToken }),
  });

  const myData = userData?.data?.data;

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
            <textarea className={clsx(styles.textarea)} value={editValue} onChange={handleEditInputChange} />
            {!editValue.trim() && <p className={styles.error}>내용을 입력해주세요.</p>}
            <div className={styles.buttons}>
              <button className={styles.button} disabled={!editValue.trim()} onClick={handleEditSubmit}>
                수정
              </button>
              <button
                className={styles.button}
                type="button"
                onClick={() => {
                  setEditingId(undefined);
                }}
              >
                취소
              </button>
            </div>
          </>
        )}

        {usage === "show" && (
          <>
            <p className={styles.comment}>{data.content}</p>
            {myData?.id === data.author.id && (
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
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
