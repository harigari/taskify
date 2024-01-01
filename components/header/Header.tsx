import styles from "./Header.module.css";
import HeaderButton from "./HeaderButton/HeaderButton";
import Members from "../Members/Members";
import ProfileIcon from "../Members/ProfileIcon";
import { BasicUserType } from "@/types/api.type";
import sender from "@/apis/sender";
import { DashBoardData } from "@/types/api.type";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Member } from "@/types/api.type";
import { getAccessTokenFromDocument } from "@/utils/getAccessToken";

const MOCKUP: BasicUserType[] = [
  { id: 1, nickname: "haneul", profileImageUrl: "" },
  { id: 2, nickname: "Youdame", profileImageUrl: "" },
  { id: 3, nickname: "Jaden", profileImageUrl: "" },
  { id: 4, nickname: "정진호", profileImageUrl: "" },
  { id: 5, nickname: "김하늘", profileImageUrl: "" },
  { id: 6, nickname: "조유담", profileImageUrl: "" },
  { id: 7, nickname: "안지수", profileImageUrl: "" },
  { id: 8, nickname: "Youdame", profileImageUrl: "" },
];

const USER: BasicUserType = {
  id: 1,
  nickname: "시골쥐",
  profileImageUrl: "",
};

const Header = () => {
  const router = useRouter();
  const boardId = router?.query.boardId;
  const [memberList, setMemberList] = useState<Member[]>();
  console.log(memberList);

  useEffect(() => {
    (async () => {
      if (router.pathname === "/dashboard/[boardId]") {
        const accessToken = getAccessTokenFromDocument("accessToken");
        const res = await sender.get({ path: "members", id: Number(boardId), accessToken });

        if (res?.status < 300) {
          setMemberList(res.data.members);
        }
      }
    })();
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.grid__title}>
        <h1 className={styles.boardname}>{""}</h1>
      </div>
      <div className={styles.grid__settings}>
        <HeaderButton src="/icons/icon-settings.svg" alt="대시보드 설정하기">
          관리
        </HeaderButton>
      </div>
      <div className={styles.grid__invite}>
        <HeaderButton src="/icons/icon-addbox.svg" alt="대시보드로 초대하기">
          초대하기
        </HeaderButton>
      </div>
      <div className={styles.grid__members}>
        <Members members={MOCKUP} />
      </div>
      <div className={styles.splitline} />
      <div className={styles.profile}>
        <ProfileIcon member={USER} />
        <span className={styles.profile__name}>{USER.nickname}</span>
      </div>
    </header>
  );
};

export default Header;
