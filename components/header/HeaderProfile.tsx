import { HeaderProfileProps, User } from "@/components/header/header.type";
import Image from "next/image";
import styles from "@/components/header/HeaderProfile.module.css";

const HeaderProfile = ({ user }: HeaderProfileProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Image className={styles.image} width={40} height={40} src={user.profileImageUrl} alt="나의 프로필" />
      </div>
      <span className={styles.username}>{user.nickname}</span>
    </div>
  );
};

export default HeaderProfile;
