import IndexHeader from "@/pages/components/IndexHeader";
import styles from "./index.module.css";
import HeroSection from "@/pages/components/HeroSection";
import FeatureSection from "@/pages/components/FeatureSection";
import SettingSection from "@/pages/components/SettingSection";

export default function Home() {
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
