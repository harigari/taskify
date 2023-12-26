import IndexHeader from "@/components/header/indexheader/IndexHeader";
import styles from "./index.module.css";
import SettingSection from "@/components/home/setting_section/SettingSection";
import FeatureSection from "@/components/home/feature_section/FeatureSection";
import HeroSection from "@/components/home/hero_section/HeroSection";

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
