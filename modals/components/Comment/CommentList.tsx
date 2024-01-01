import InputWrapper from "@/components/Input/InputWrapper";
import useApi from "@/hooks/useApi";
import useInputController from "@/hooks/useInputController";
import Comment from "@/modals/components/Comment/Comment";

import { CardData, CommentData } from "@/types/api.type";
import { FormEvent, useEffect, useState } from "react";
import styles from "./CommentList.module.css";
import { getAccessTokenFromDocument } from "@/utils/getAccessToken";
import sender from "@/apis/sender";
import CommentTextArea from "../ModalInput/CommentTextArea";

interface CommentListProps {
  cardData: CardData;
}

const CommentList = ({ cardData }: CommentListProps) => {
  const comment = useInputController({
    inputConfig: { id: "comment", type: "text" },
    labelConfig: { labelName: "댓글", mobile: true },
  });

  const commentEdit = useInputController({
    inputConfig: { id: "comment", type: "text", initialvalue: "" },
    labelConfig: {},
  });

  // 댓글 가져오기
  const accessToken = getAccessTokenFromDocument("accessToken");
  const [commentList, setCommentList] = useState<CommentData[]>([]);

  useEffect(() => {
    (async () => {
      const res = await sender.get({
        path: "comments",
        id: cardData.id,
        accessToken: accessToken,
      });

      if (res.status < 300) {
        setCommentList(res.data.comments);
      }
    })();
  }, []);

  // 댓글 추가하기
  const { pending: postPending, wrappedFunction: postData } = useApi("post");
  const handleCommentSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (postPending) return;
    const res = await postData({
      path: "comment",
      data: {
        content: comment.input.value,
        cardId: cardData.id,
        columnId: cardData.columnId,
        dashboardId: cardData.dashboardId,
      },
      accessToken,
    });

    if (res?.status === 201) {
      setCommentList((prev) => [res.data, ...(prev ?? [])]);
      comment.input.setValue("");
    }
  };

  const [editingId, setEditingId] = useState<number>();

  const handleEditCancel = () => {
    setEditingId(undefined);
  };
  const { wrappedFunction: putData } = useApi("put");

  // 댓글 수정하기
  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await putData({
      path: "comment",
      data: {
        content: commentEdit.input.value,
      },
      id: editingId as number,
      accessToken,
    });
    if (res?.status === 200) {
      const editedCommentIndex = commentList.findIndex((comment) => comment.id === editingId);

      if (editedCommentIndex !== -1) {
        // 댓글 배열 복사
        const updatedComments = [...commentList];
        // 수정된 댓글을 업데이트
        updatedComments[editedCommentIndex] = res.data;

        // 댓글 배열 업데이트
        setCommentList(updatedComments);
        setEditingId(undefined);
      }
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleCommentSubmit}>
        <InputWrapper {...comment.wrapper}>
          <CommentTextArea disabled={!comment.input.value} {...comment.textarea}>
            입력
          </CommentTextArea>
        </InputWrapper>
      </form>
      <div className={styles.comments}>
        {commentList?.map((comment) =>
          comment.id === editingId ? (
            <form key={comment.id} onSubmit={handleEditSubmit}>
              <InputWrapper {...commentEdit.wrapper}>
                <CommentTextArea disabled={!commentEdit.input.value} {...commentEdit.textarea} value={comment.content}>
                  입력
                </CommentTextArea>
              </InputWrapper>
              <button className={styles.button} onClick={handleEditCancel}>
                취소
              </button>
            </form>
          ) : (
            <Comment key={comment.id} data={comment} setData={setCommentList} setEditingId={setEditingId} />
          )
        )}
      </div>
    </>
  );
};

export default CommentList;
