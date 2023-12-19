import styles from "@/components/header/BoardHeader.module.css";
import HeaderProfile from "@/components/header/HeaderProfile";
import Members from "@/components/header/Members";
import { Member } from "@/components/header/Members.type";
import clsx from "clsx";
import Image from "next/image";

const MOCKUP: Member[] = [
  { id: 1, nickname: "김하늘", profileImageUrl: "/images/logo-purple.svg" },
  { id: 2, nickname: "조유담", profileImageUrl: "/images/logo-white.svg" },
  { id: 3, nickname: "안지수", profileImageUrl: "/images/logo-purple.svg" },
  { id: 4, nickname: "정진호", profileImageUrl: "/images/logo-white.svg" },
  { id: 1, nickname: "김하늘", profileImageUrl: "/images/logo-purple.svg" },
  { id: 2, nickname: "조유담", profileImageUrl: "/images/logo-white.svg" },
  { id: 3, nickname: "안지수", profileImageUrl: "/images/logo-purple.svg" },
  { id: 4, nickname: "정진호", profileImageUrl: "/images/logo-white.svg" },
];

const Boardheader = () => {
  return (
    <header className={styles.header}>
      <p className={clsx(styles.boardname, styles.grid__title)}>내 대시보드</p>
      <button className={clsx(styles.button, styles.grid__settings)}>
        <Image width={20} height={20} src="/images/icon-settings.svg" alt="설정 페이지로 이동" />
        <span>관리</span>
      </button>
      <button className={clsx(styles.button, styles.grid__invite)}>
        <Image width={20} height={20} src="/images/icon-addbox.svg" alt="설정 페이지로 이동" />
        <span>초대하기</span>
      </button>
      <Members members={MOCKUP} />
      <div className={styles.splitline} />
      <HeaderProfile />
    </header>
  );
};

export default Boardheader;
