import styles from "./ProfileIcon.module.css";
import { ProfileIconProps } from "@/components/header/header.type";
import { colorMapping } from "@/utils/colorMapping";
import Image from "next/image";

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
