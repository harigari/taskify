import styles from "./Header.module.css";
import HeaderButton from "./HeaderButton/HeaderButton";
import Members from "../Members/Members";
import ProfileIcon from "../Members/ProfileIcon";
import { BasicUserType } from "@/types/api.type";
import sender from "@/apis/sender";
import { DashBoardData } from "@/types/api.type";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { Member, ExtendedUserType } from "@/types/api.type";
import { getAccessTokenFromDocument } from "@/utils/getAccessToken";
import Link from "next/link";

interface HeaderProps {
  dashboardList: DashBoardData[];
}

const Header = ({ dashboardList }: HeaderProps) => {
  const router = useRouter();
  const boardId = router?.query.boardId;
  const [memberList, setMemberList] = useState<Member[]>([]);
  const [myData, setMyData] = useState<ExtendedUserType>();
  const isOwner = memberList?.some((v) => v.userId === myData?.id);

  useEffect(() => {
    (async () => {
      const accessToken = getAccessTokenFromDocument("accessToken");

      const myRes = await sender.get({ path: "me", accessToken });

      if (myRes?.status < 300) {
        setMyData(myRes.data);
      }

      if (router.pathname === "/dashboard/[boardId]") {
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
        {boardId && <h1 className={styles.boardname}>{dashboardList?.find((v) => v.id === Number(boardId))?.title}</h1>}
      </div>
      {isOwner && (
        <>
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
        </>
      )}
      <div className={styles.grid__members}>
        <Members members={memberList} />
      </div>
      {boardId && <div className={styles.splitline} />}
      <Link href="/mypage" className={styles.profile}>
        <ProfileIcon member={myData} tabIndex={-1} />
        <span className={styles.profile__name}>{myData?.nickname}</span>
      </Link>
    </header>
  );
};

export default Header;
