import MenuLayout from "@/components/MenuLayout/MenuLayout";
import TablePagenation from "@/components/Table/TablePagenation/TablePagenation";
import TableScroll from "@/components/Table/TableScroll/TableScroll";
import styles from "./index.module.css";

const MEMBER = [
  { id: 1, nickname: "haneul", profileImageUrl: "" },
  { id: 2, nickname: "Youdame", profileImageUrl: "" },
  { id: 3, nickname: "Jaden", profileImageUrl: "" },
  { id: 4, nickname: "정진호", profileImageUrl: "" },
  { id: 5, nickname: "김하늘", profileImageUrl: "" },
  { id: 6, nickname: "조유담", profileImageUrl: "" },
  { id: 7, nickname: "안지수", profileImageUrl: "" },
  { id: 8, nickname: "Youdame", profileImageUrl: "" },
];

export const INVITE = [
  {
    id: 1,
    dashboard: {
      title: "나의 대시보드",
      id: 1,
    },
    invitee: {
      nickname: "유다미",
      email: "youdame@codeit.kr",
      id: 22,
    },
    inviteAccepted: true,
  },
  {
    id: 2,
    dashboard: {
      title: "리액트 탐험",
      id: 15,
    },
    invitee: {
      nickname: "김하늘",
      email: "haneulkim@codeit.kr",
      id: 82,
    },
    inviteAccepted: true,
  },
  {
    id: 3,
    dashboard: {
      title: "제 생각에는요",
      id: 14,
    },
    invitee: {
      nickname: "정진호",
      email: "jjh@codeit.kr",
      id: 56,
    },
    inviteAccepted: true,
  },
  {
    id: 4,
    dashboard: {
      title: "좋은것같아요",
      id: 3,
    },
    invitee: {
      nickname: "안지수",
      email: "ahn@codeit.kr",
      id: 34,
    },
    inviteAccepted: true,
  },
];

export default function DashBoard() {
  return (
    <MenuLayout>
      <div className={styles.container}>
        <TablePagenation
          title="구성원"
          data={MEMBER}
          row={3}
          tableindex={{ 이름: "nickname", "": "deleteButton" }}
          invite
          search
        />
        {/* <TablePagenation title="구성원" data={MEMBER} row={6} tableindex={{ 웃음: "nickname", 라벨: "button" }} /> */}
        <TablePagenation
          title="초대받은 대시보드"
          data={INVITE}
          row={3}
          tableindex={{ 이름: "dashboard", 초대자: "invitee", "수락 여부": "acceptButton" }}
          search
        />
        <TableScroll title="초대받은 대시보드" tableindex={{ 이름: "dashboard" }} />
      </div>
    </MenuLayout>
  );
}
