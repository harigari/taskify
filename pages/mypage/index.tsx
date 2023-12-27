import MenuLayout from "@/components/MenuLayout/MenuLayout";
import SettingProfile from "@/pages/mypage/components/SettingProfile";
import Image from "next/image";
import styles from "./mypage.module.css";
import SettingPassword from "@/pages/mypage/components/SettingPassword";

const MyPage = () => {
  return (
    <MenuLayout>
      <main className={styles.main}>
        <button className={styles.backbutton}>
          <div className={styles.backbutton__img}>
            <Image fill src="/icons/icon-arrowleft.svg" alt="이전 페이지로 돌아가기" />
          </div>
          <span>돌아가기</span>
        </button>
        <section className={styles.section}>
          <SettingProfile />
          <SettingPassword />
        </section>
      </main>
    </MenuLayout>
  );
};

export default MyPage;
