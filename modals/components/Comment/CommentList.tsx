import InputWrapper from "@/components/Input/InputWrapper";
import useApi from "@/hooks/useApi";
import useInputController from "@/hooks/useInputController";
import Comment from "@/modals/components/Comment/Comment";
import { CardData, CommentData } from "@/types/api.type";
import { FormEvent, useEffect, useState } from "react";
import styles from "./CommentList.module.css";
import { getAccessTokenFromDocument } from "@/utils/getAccessToken";
import CommentTextArea from "../ModalInput/CommentTextArea";
import useInfScroll from "@/hooks/useInfScroll";
import sender from "@/apis/sender";
import SENDER_CONFIG from "@/constants/senderConfig";

interface CommentListProps {
  cardData: CardData;
}

type Pagination = {
  id: number;
  size: number;
  cursorId?: number;
};

type InfRes = {
  comments: CommentData[];
  cursorId: number;
};

const CommentList = ({ cardData }: CommentListProps) => {
  const comment = useInputController({
    inputConfig: { id: "comment", type: "text" },
    labelConfig: { labelName: "댓글", mobile: true },
  });

  const { isVisible, setIsVisible, myRef } = useInfScroll();
  const [pagination, setPagination] = useState<Pagination>({
    id: cardData.id,
    size: 5,
  });

  // 댓글 가져오기
  const accessToken = getAccessTokenFromDocument("accessToken");
  const [commentList, setCommentList] = useState<CommentData[]>([]);

  const getComments = async () => {
    const { id, size, cursorId } = pagination;
    let response;

    if (cursorId) {
      response = await sender.get({ path: "comments", id, size, cursorId, accessToken });
    } else {
      response = await sender.get({ path: "comments", id, size, accessToken });
    }

    if (response.status !== 200) return;

    const { comments, cursorId: cursor } = response.data;

    setPagination((prevValue) => {
      return { ...prevValue, cursorId: cursor };
    });
    setCommentList((prevValue) => [...prevValue, ...comments]);
    setIsVisible(false);
  };

  useEffect(() => {
    if (pagination.cursorId === null) return;
    if (isVisible) {
      getComments();
    }
  }, [isVisible]);

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
        {commentList.map((comment) => (
          <Comment
            key={comment.id}
            usage={editingId === comment.id ? "edit" : "show"}
            data={comment}
            setCommentList={setCommentList}
            setEditingId={setEditingId}
            handleEditCancel={handleEditCancel}
          />
        ))}
        <p ref={myRef}></p>
      </div>
    </>
  );
};

export default CommentList;
