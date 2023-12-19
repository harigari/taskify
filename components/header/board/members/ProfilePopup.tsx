import ProfileIcon from "@/components/header/board/members/ProfileIcon";
import { ProfilePopupProps } from "@/components/header/header.type";
import styles from "./ProfilePopup.module.css";

const ProfilePopup = ({ member }: ProfilePopupProps) => {
  const arr = member instanceof Array ? member : [member];

  return (
    <ul className={styles.popup}>
      {arr.map((member, idx) => (
        <li className={styles.popup__list} key={member.id} data-index={arr.length > 2 && idx}>
          <ProfileIcon member={member} />
          <span className={styles.popup__name}>{member.nickname}</span>
        </li>
      ))}
    </ul>
  );
};

export default ProfilePopup;
