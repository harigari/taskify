import InputWrapper from "@/components/Input/InputWrapper";
import useApi from "@/hooks/useApi";
import useInputController from "@/hooks/useInputController";
import Comment from "@/modals/components/Comment/Comment";
import CommentInput from "@/modals/components/ModalInput/CommentInput";
import { CardData, CommentData } from "@/types/api.type";
import { FormEvent, useEffect, useState } from "react";
import styles from "./CommentList.module.css";
import { getAccessTokenFromDocument } from "@/utils/getAccessToken";
import sender from "@/apis/sender";

interface CommentListProps {
  cardData: CardData;
}

const CommentList = ({ cardData }: CommentListProps) => {
  const comment = useInputController({
    inputConfig: { id: "comment", type: "text" },
    labelConfig: { labelName: "댓글", mobile: true },
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
  return (
    <>
      <form className={styles.form} onSubmit={handleCommentSubmit}>
        <InputWrapper {...comment.wrapper}>
          <CommentInput disabled={!comment.input.value} {...comment.textarea}>
            입력
          </CommentInput>
        </InputWrapper>
      </form>
      <div className={styles.comments}>
        {commentList?.map((comment) => (
          <Comment key={comment.id} data={comment} setData={setCommentList} />
        ))}
      </div>
    </>
  );
};

export default CommentList;
