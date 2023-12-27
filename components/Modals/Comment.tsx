import ProfileIcon from "../header/members/ProfileIcon";
import { Comment } from "./Modal.type";
import styles from "./Comment.module.css";
interface CommentProps {
  data: Comment;
}
const Comment = ({ data }: CommentProps) => {
  return (
    <div className={styles.wrapper}>
      <ProfileIcon size="lg" member={data.author} />
      <div className={styles.detail}>
        <div className={styles.header}>
          <span className={styles.author}>{data.author.nickname}</span>
          <span className={styles.createdAt}>{data.createdAt}</span>
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
