import FeatureSection from "@/pages/components/FeatureSection";
import HeroSection from "@/pages/components/HeroSection";
import IndexHeader from "@/pages/components/IndexHeader";
import SettingSection from "@/pages/components/SettingSection";
import styles from "./index.module.css";

export default function Home() {
  const mock = {
    id: 1,
    title: "스프린트 중급 프로젝트",
    tags: ["HTML", "CSS", "JS", "정적 생성", "서버사이드 렌더링"],
    dueDate: "2023-01-10T15:30:15.000Z",
    assignee: {
      // profileImageUrl: "string",
      nickname: "Jisoo",
      id: 1,
    },
    imageUrl: "/images/card-image2.svg",
  };
  return (
    <>
      <IndexHeader color="black" />
      <main className={styles.main}>
        <HeroSection />
        <FeatureSection />
        <SettingSection />
      </main>
    </>
  );
}
