import MenuLayout from "@/components/MenuLayout/MenuLayout";
import Table from "@/components/Table/Table";

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

const INVITE = [
  {
    id: 1,
    dashboard: {
      title: "나의 대시보드",
      id: 1,
    },
    invitee: {
      nickname: "유다미",
      email: "string",
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
      email: "string",
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
      email: "string",
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
      email: "string",
      id: 34,
    },
    inviteAccepted: true,
  },
];

export default function Home() {
  return (
    <MenuLayout>
      <Table
        title="초대받은 대시보드"
        data={INVITE}
        row={4}
        tableindex={{ 이름: "dashboard", 초대자: "invitee", "": "button" }}
      />
      <Table title="구성원" data={MEMBER} row={3} tableindex={{ 웃음: "nickname", "": "button" }} />
    </MenuLayout>
  );
}
