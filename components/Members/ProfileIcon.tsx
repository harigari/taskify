import { Member } from "@/components/Header/Header.type";
import { makeColorProfile } from "@/utils/makeColorProfile";
import clsx from "clsx";
import Image from "next/image";
import styles from "./ProfileIcon.module.css";

type Handler = () => void;

type HandlerName = "onMouseOver" | "onMouseOut" | "onTouchStart" | "onFocus" | "onBlur";

type HandlerFunc = {
  [k in HandlerName]?: Handler;
};

interface ProfileIconProps extends HandlerFunc {
  member: Member;
  size?: "sm" | "lg";
  tabIndex?: number;
  className?: string;
}

const ProfileIcon = ({ member, size = "lg", ...props }: ProfileIconProps) => {
  return (
    <button className={styles.member} {...props}>
      {member.profileImageUrl ? (
        <div className={clsx(styles.member__image, { [styles.member_image__small]: size === "sm" })}>
          <Image fill src={member.profileImageUrl} alt={member.nickname} />
        </div>
      ) : (
        <div
          className={clsx(styles.member__defaultimage, { [styles.card]: size === "sm" })}
          style={{ backgroundColor: makeColorProfile(member.nickname) }}
        />
      )}
      <span className={styles.member__name}>{member.nickname.slice(0, 1)}</span>
    </button>
  );
};

export default ProfileIcon;
