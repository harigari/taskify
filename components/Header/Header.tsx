import sender from "@/apis/sender";
import { DashBoardData, ExtendedUserType, Member } from "@/types/api.type";
import { getAccessTokenFromDocument } from "@/utils/getAccessToken";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InviteButton from "../Buttons/InviteButton/InviteButton";
import Members from "../Members/Members";
import ProfileIcon from "../Members/ProfileIcon";
import styles from "./Header.module.css";
import HeaderButton from "./HeaderButton/HeaderButton";
import { useAtom, useAtomValue } from "jotai";
import { accessTokenAtom, dashboardListAtom } from "@/atoms/atoms";
import { useQuery } from "@tanstack/react-query";

const WELCOME_MESSAGE = [
  "우리가 하는 일은 큰 일이죠. 큰일나기 전까지는요.",
  "바라는 일이 되기를 바라.",
  "오늘도 좋은 하루 되세요!",
  "할 수 있는 만큼만 하기.",
];

const Header = () => {
  const router = useRouter();
  const boardId = router?.query.boardId;
  const [memberList, setMemberList] = useState<Member[]>([]);
  const [myData, setMyData] = useState<ExtendedUserType>();

  const accessToken = useAtomValue(accessTokenAtom);

  const dashboards = useQuery({
    queryKey: ["dashboards"],
    queryFn: () => sender.get({ path: "dashboards", method: "pagination", size: 999, accessToken: accessToken }),
    enabled: !!accessToken,
  });

  const dashboardList = dashboards.data?.data.dashboards ?? [];

  const dashboard = dashboardList.find((item) => {
    return item.id === Number(boardId);
  });

  const isOwner = memberList?.find((v) => v.userId === myData?.id)?.isOwner;
  const [title, setTitle] = useState(dashboard?.title);

  useEffect(() => {
    setTitle(dashboard?.title);
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
  }, [dashboard, router.query]);

  return (
    <header className={styles.header}>
      <div className={styles.grid__title}>
        {title ? <h1 className={styles.boardname}>{title.length > 20 ? title.slice(0, 20) + "..." : title}</h1> : null}
      </div>
      {isOwner && (
        <>
          <div className={styles.grid__settings}>
            <Link href={`${boardId}/edit`}>
              <HeaderButton src="/icons/icon-settings.svg" alt="대시보드 설정하기">
                관리
              </HeaderButton>
            </Link>
          </div>
          <InviteButton usage="header" />
        </>
      )}
      {boardId && (
        <>
          <div className={styles.grid__members}>
            <Members members={memberList} />
          </div>
          <div className={styles.splitline} />
        </>
      )}
      <Link href="/mypage" className={styles.profile}>
        <ProfileIcon member={myData} />
        <span className={styles.profile__name}>{myData?.nickname}</span>
      </Link>
    </header>
  );
};

export default Header;
