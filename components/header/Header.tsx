import { Member, User } from "@/components/Header/Header.type";
import styles from "./Header.module.css";
import HeaderButton from "./HeaderButton/HeaderButton";
import Members from "./Members/Members";
import Profile from "./Members/Profile";

const MOCKUP: Member[] = [
  { id: 1, nickname: "haneul", profileImageUrl: "" },
  { id: 2, nickname: "Youdame", profileImageUrl: "" },
  { id: 3, nickname: "Jaden", profileImageUrl: "" },
  { id: 4, nickname: "정진호", profileImageUrl: "" },
  { id: 5, nickname: "김하늘", profileImageUrl: "" },
  { id: 6, nickname: "조유담", profileImageUrl: "" },
  { id: 7, nickname: "안지수", profileImageUrl: "" },
  { id: 8, nickname: "Youdame", profileImageUrl: "" },
];

const USER: User = {
  id: 1,
  email: "codeit@codeit.kr",
  nickname: "시골쥐",
  profileImageUrl: "",
};

const Header = () => {
  const title = "내 대시보드";

  return (
    <header className={styles.header}>
      <div className={styles.grid__title}>
        <h1 className={styles.boardname}>{title}</h1>
      </div>
      <div className={styles.grid__settings}>
        <HeaderButton src="/images/icon-settings.svg" alt="대시보드 설정하기">
          관리
        </HeaderButton>
      </div>
      <div className={styles.grid__invite}>
        <HeaderButton src="/images/icon-addbox.svg" alt="대시보드로 초대하기">
          초대하기
        </HeaderButton>
      </div>
      <div className={styles.grid__members}>
        <Members members={MOCKUP} />
      </div>
      <div className={styles.splitline} />
      <div className={styles.profile}>
        <Profile member={USER} />
        <span className={styles.profile__name}>{USER.nickname}</span>
      </div>
    </header>
  );
};

export default Header;
