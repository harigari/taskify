import styles from "./ProfileIcon.module.css";
import clsx from "clsx";
import { ProfileIconProps } from "@/components/header/header.type";
import { colorMapping } from "@/utils/colorMapping";
import Image from "next/image";

const ProfileIcon = ({ member, size, ...props }: ProfileIconProps) => {
  return (
    <button className={styles.member} {...props}>
      {member.profileImageUrl ? (
        <Image
          className={clsx(styles.member__image, { [styles.card]: size === "sm" })}
          width={40}
          height={40}
          src={member.profileImageUrl}
          alt={member.nickname}
        />
      ) : (
        <div
          className={clsx(styles.member__defaultimage, { [styles.card]: size === "sm" })}
          style={{ backgroundColor: colorMapping(member.nickname) }}
        />
      )}
      <span className={styles.member__name}>{member.nickname.slice(0, 1)}</span>
    </button>
  );
};

export default ProfileIcon;
