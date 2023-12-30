import Button from "@/components/Buttons/Button/Button";
import TablePagenation from "@/components/Table/TablePagination/TablePagination";
import Image from "next/image";
import styles from "./index.module.css";
import MenuLayout from "@/components/menulayout/MenuLayout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import getAccessTokenFromCookie from "@/utils/getAccessTokenFromCookie";
import sender from "@/apis/sender";
import { FormEvent, useState } from "react";
import SingleInputModal from "@/modals/SingleInputModal";
import useInputController from "@/hooks/useInputController";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = getAccessTokenFromCookie(context) as string;

  // const response = sender.get({ path: "dashboards", method: "pagination", accessToken });

  return {
    props: { accessToken },
  };
};

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

const DASHBOARD = [
  {
    id: 1,
    title: "행복해서",
    color: "green",
    createdByMe: true,
  },
  {
    id: 2,
    title: "웃는게 아니라",
    color: "purple",
    createdByMe: true,
  },
  {
    id: 3,
    title: "웃어서",
    color: "orange",
    createdByMe: false,
  },
  {
    id: 4,
    title: "행복한거다",
    color: "blue",
    createdByMe: false,
  },
  {
    id: 5,
    title: "중요!",
    color: "pink",
    createdByMe: true,
  },
];

const INVITE = [
  {
    id: 1,
    dashboard: {
      title: "나의 대시보드",
      id: 1,
    },
    inviter: {
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
    inviter: {
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
    inviter: {
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
    inviter: {
      nickname: "안지수",
      email: "ahn@codeit.kr",
      id: 34,
    },
    inviteAccepted: true,
  },
];

export default function Mydashboard({ accessToken }: InferGetServerSidePropsType<GetServerSideProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const handleModalToggle = () => {
    setIsOpen((prevValue) => !prevValue);
  };

  const column = useInputController({
    inputConfig: {
      id: "newDashboard",
      type: "text",
    },
    labelConfig: { labelName: "대시보드 이름" },
  });

  return (
    <>
      <MenuLayout>
        <main>
          <section className={styles.container}>
            <article className={styles.dashboard}>
              <Button buttonType="dashboard" color="white" onClick={handleModalToggle}>
                <span>새로운 대시보드</span>
                <Image width={22} height={22} src="/images/image-addbox-purple.png" alt="대시보드 추가하기" />
              </Button>
              {DASHBOARD.map((dashboard) => (
                <Button key={dashboard.id} buttonType="dashboard" color="white">
                  <div className={styles.dashboard__title}>
                    <div className={styles.dashboard__icon} style={{ backgroundColor: `var(--${dashboard.color})` }} />
                    <span>{dashboard.title}</span>
                  </div>
                  <Image
                    width={18}
                    height={18}
                    src="/icons/icon-arrowright.svg"
                    alt={`${dashboard.title} 대시보드로 바로가기`}
                  />
                </Button>
              ))}
            </article>
            <TablePagenation
              title="초대받은 대시보드"
              row={3}
              data={INVITE}
              tableIndex={{ 이름: "dashboard", 초대자: "inviter", "수락 여부": "deleteButton" }}
              search
            />
          </section>
        </main>
      </MenuLayout>
      {isOpen && (
        <SingleInputModal
          title="새로운 대시보드"
          buttonText="생성"
          handleModalClose={handleModalToggle}
          chip={true}
          inputController={column}
          onSubmit={(e: FormEvent) => {
            e.preventDefault();

            const data = {
              title: "할리갈리3",
              color: "#ffa500",
            };

            fetch("https://sp-taskify-api.vercel.app/1-7/dashboards/", {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                Authorization:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjkyLCJ0ZWFtSWQiOiIxLTciLCJpYXQiOjE3MDM5MjcwMzQsImlzcyI6InNwLXRhc2tpZnkifQ.8Yx8PbkZQ-RvXo8ufFuLXl1MMa09xCWrauEUKk06NaM",
              },
            });
          }}
        />
      )}
    </>
  );
}
