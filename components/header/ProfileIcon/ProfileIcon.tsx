import styles from "./ProfileIcon.module.css";
import clsx from "clsx";
import Image from "next/image";
import { Member } from "@/types/api.type";
import makeColorProfile from "@/utils/makeColorProfile";

interface ProfileIconProps {
  member: Member;
  size: "sm" | "lg";
  tabIndex?: number;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  onTouchStart?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const ProfileIcon = ({ member, size, ...props }: ProfileIconProps) => {
  return (
    <button className={styles.member} {...props}>
      {member.profileImageUrl ? (
        <div className={styles.profileImageWrapper}>
          <Image
            className={clsx(styles.member__image, { [styles.card]: size === "sm" })}
            fill
            src={member.profileImageUrl}
            alt={member.nickname}
          />
        </div>
      ) : (
        <div
          className={clsx(styles.member__defaultimage, { [styles.card]: size === "sm" })}
          style={{ backgroundColor: makeColorProfile(member.nickname) }}
        >
          <span className={styles.member__name}>{member.nickname.slice(0, 1)}</span>
        </div>
      )}
    </button>
  );
};

export default ProfileIcon;
