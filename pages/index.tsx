import FeatureSection from "@/pages/components/FeatureSection";
import HeroSection from "@/pages/components/HeroSection";
import IndexHeader from "@/pages/components/IndexHeader";
import SettingSection from "@/pages/components/SettingSection";
import styles from "./index.module.css";

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
