import { BasicUserType } from "@/types/api.type";
import ProfileIcon from "./ProfileIcon";
import styles from "./ProfilePopup.module.css";

interface ProfilePopupProps {
  member: BasicUserType | BasicUserType[];
}

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
