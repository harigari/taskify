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
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface CommentListProps {
  cardData: CardData;
}

type Pagination = {
  id: number;
  size: number;
  cursorId?: number;
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

  const acommentList = useInfiniteQuery({
    queryKey: ["comments", cardData.id],
    queryFn: ({ pageParam }) => {
      if (pageParam) {
        return sender.get({ path: "comments", id: cardData.id, size: 5, cursorId: pageParam, accessToken });
      } else {
        return sender.get({ path: "comments", id: cardData.id, size: 5, accessToken });
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.data.cursorId,
  });

  useEffect(() => {
    if (pagination.cursorId === null) return;
    if (isVisible) {
      acommentList.fetchNextPage();
    }
  }, [isVisible]);

  const queryClient = useQueryClient();

  const commentMutation = useMutation({
    mutationFn: () =>
      sender.post({
        path: "comment",
        data: {
          content: comment.input.value,
          cardId: cardData.id,
          columnId: cardData.columnId,
          dashboardId: cardData.dashboardId,
        },
        accessToken,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", cardData.id] });
      comment.input.setValue("");
    },
  });

  // 댓글 추가하기
  const handleCommentSubmit = async (e: FormEvent) => {
    e.preventDefault();
    commentMutation.mutate();
  };

  const [editingId, setEditingId] = useState<number>();

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
        {acommentList.data?.pages.map((comments) =>
          comments.data.comments.map((comment) => (
            <Comment
              cardId={cardData.id}
              key={comment.id}
              usage={editingId === comment.id ? "edit" : "show"}
              data={comment}
              setEditingId={setEditingId}
            />
          ))
        )}
        <p ref={myRef}></p>
      </div>
    </>
  );
};

export default CommentList;
