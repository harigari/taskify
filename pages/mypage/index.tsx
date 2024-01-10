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
import { clientProvider } from "@/apis/clientProvider";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const accessToken = getAccessTokenFromCookie(context) as string;

  const queryClient = await clientProvider(context);

  if (!accessToken) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  return {
    props: { dehydratedState: dehydrate(queryClient) },
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
