import sender from "@/apis/sender";
import RedoButton from "@/components/Buttons/RedoButton/RedoButton";
import MenuLayout from "@/components/MenuLayout/MenuLayout";
import SettingPassword from "@/pages/mypage/components/SettingPassword";
import SettingProfile from "@/pages/mypage/components/SettingProfile";
import { getAccessTokenFromCookie } from "@/utils/getAccessToken";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import styles from "./mypage.module.css";
import Head from "next/head";
import { QueryClient, dehydrate } from "@tanstack/react-query";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const accessToken = getAccessTokenFromCookie(context) as string;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["dashboards"],
    queryFn: () => sender.get({ path: "dashboards", method: "pagination", size: 999, accessToken: accessToken }),
  });

  await queryClient.prefetchQuery({ queryKey: ["user"], queryFn: () => sender.get({ path: "me", accessToken }) });

  if (!accessToken) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  return {
    props: { dehydratedState: dehydrate(queryClient), accessToken },
  };
};

const MyPage = () => {
  return (
    <>
      <Head>
        <title>Taskify - 나의 정보 수정</title>
      </Head>
      <MenuLayout>
        <main className={styles.main}>
          <RedoButton />
          <section className={styles.section}>
            <SettingProfile />
            <SettingPassword />
          </section>
        </main>
      </MenuLayout>
    </>
  );
};

export default MyPage;
