import { Member } from "@/components/Header/Header.type";
import { colorMapping } from "@/utils/colorMapping";
import Image from "next/image";
import styles from "./ProfileIcon.module.css";

interface ProfileIconProps {
  member: Member;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  onTouchStart?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const ProfileIcon = ({ member, ...props }: ProfileIconProps) => {
  return (
    <button className={styles.member} {...props}>
      {member.profileImageUrl ? (
        <Image
          className={styles.member__image}
          width={40}
          height={40}
          src={member.profileImageUrl}
          alt={member.nickname}
        />
      ) : (
        <div className={styles.member__defaultimage} style={{ backgroundColor: colorMapping(member.nickname) }} />
      )}
      <span className={styles.member__name}>{member.nickname.slice(0, 1)}</span>
    </button>
  );
};

export default ProfileIcon;
