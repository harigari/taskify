import ProfileIcon from "@/components/Members/ProfileIcon";
import { CommentData } from "@/types/api.type";
import formatDate from "@/utils/formatDateString";
import styles from "./Comment.module.css";

interface CommentProps {
  data: CommentData;
}

const Comment = ({ data }: CommentProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.profile_icon}>
        <ProfileIcon size="lg" member={data.author} />
      </div>
      <div className={styles.detail}>
        <div className={styles.header}>
          <span className={styles.author}>{data.author.nickname}</span>
          <span className={styles.createdAt}>{formatDate(data.createdAt)}</span>
        </div>
        <div className={styles.comment}>{data.content}</div>
        <div className={styles.buttons}>
          <button className={styles.button}>수정</button>
          <button className={styles.button}>삭제</button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
