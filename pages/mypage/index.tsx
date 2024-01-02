import MenuLayout from "@/components/MenuLayout/MenuLayout";
import SettingPassword from "@/pages/mypage/components/SettingPassword";
import SettingProfile from "@/pages/mypage/components/SettingProfile";
import Image from "next/image";
import styles from "./mypage.module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getAccessTokenFromCookie } from "@/utils/getAccessToken";
import sender from "@/apis/sender";
import Link from "next/link";
import { useRouter } from "next/router";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const accessToken = getAccessTokenFromCookie(context) as string;

  const {
    data: { dashboards },
  } = await sender.get({ path: "dashboards", method: "pagination", accessToken });

  const { data: userData } = await sender.get({ path: "me", accessToken });

  if (!accessToken) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  return {
    props: { dashboards, userData },
  };
};

const MyPage = ({ dashboards, userData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  return (
    <MenuLayout dashboardList={dashboards}>
      <main className={styles.main}>
        <button onClick={() => router.back()} className={styles.backbutton}>
          <div className={styles.backbutton__img}>
            <Image fill src="/icons/icon-arrowleft.svg" alt="이전 페이지로 돌아가기" />
          </div>
          <span>돌아가기</span>
        </button>
        <section className={styles.section}>
          <SettingProfile userData={userData} />
          <SettingPassword />
        </section>
      </main>
    </MenuLayout>
  );
};

export default MyPage;
