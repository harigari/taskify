import styles from "@/components/header/board/HeaderProfile.module.css";
import { HeaderProfileProps } from "@/components/header/header.type";
import { colorMapping } from "@/utils/colorMapping";
import Image from "next/image";

const HeaderProfile = ({ user }: HeaderProfileProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {user.profileImageUrl ? (
          <Image className={styles.image} width={40} height={40} src={user.profileImageUrl} alt="나의 프로필" />
        ) : (
          <div className={styles.defaultimage} style={{ backgroundColor: colorMapping(user.nickname) }} />
        )}
      </div>
      <span className={styles.username}>{user.nickname}</span>
    </div>
  );
};

export default HeaderProfile;
