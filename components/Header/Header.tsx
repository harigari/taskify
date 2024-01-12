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

  const accessToken = useAtomValue(accessTokenAtom);

  const user = useQuery({ queryKey: ["user"], queryFn: () => sender.get({ path: "me", accessToken }) });
  const myData = user.data?.data;

  const members = useQuery({
    queryKey: ["members", boardId],
    queryFn: () => sender.get({ path: "members", id: Number(boardId), accessToken }),
  });

  const memberList = members?.data?.data.members ?? [];

  const dashboards = useQuery({
    queryKey: ["dashboards"],
    queryFn: () => sender.get({ path: "dashboards", method: "pagination", size: 999, accessToken: accessToken }),
  });
  const dashboardList = dashboards.data?.data.dashboards ?? [];

  const dashboard = dashboardList.find((item) => {
    return item.id === Number(boardId);
  });

  const title = dashboard?.title;
  const isOwner = memberList?.find((v) => v.userId === myData?.id)?.isOwner;

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
