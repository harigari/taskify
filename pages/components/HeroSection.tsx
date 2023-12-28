import React from "react";
import styles from "./HeroSection.module.css";
import Image from "next/image";
const HeroSection = () => {
  return (
    <>
      {/* 첫 번째 section : hero-header */}
      <section className={styles.hero_section}>
        <div className={styles.image_wrapper}>
          <Image fill src="/images/photos/landing_hero.png" alt="taskify 히어로 이미지" />
        </div>
        <h1 className={styles.heading}>
          새로운 일정 관리<span className={styles.violet}>Taskify</span>
        </h1>
        <button className={styles.button}>로그인하기</button>
      </section>
    </>
  );
};

export default HeroSection;
