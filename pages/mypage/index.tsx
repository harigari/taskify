import sender from "@/apis/sender";
import RedoButton from "@/components/Buttons/RedoButton/RedoButton";
import MenuLayout from "@/components/MenuLayout/MenuLayout";
import SettingPassword from "@/pages/mypage/components/SettingPassword";
import SettingProfile from "@/pages/mypage/components/SettingProfile";
import { getAccessTokenFromCookie } from "@/utils/getAccessToken";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import styles from "./mypage.module.css";

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
        <RedoButton />
        <section className={styles.section}>
          <SettingProfile userData={userData} />
          <SettingPassword />
        </section>
      </main>
    </MenuLayout>
  );
};

export default MyPage;
