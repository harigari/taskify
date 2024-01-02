import React from "react";
import styles from "./HeroSection.module.css";
import Image from "next/image";
import Link from "next/link";
const HeroSection = () => {
  return (
    <>
      {/* 첫 번째 section : hero-header */}
      <section className={styles.hero_section}>
        <div className={styles.image_wrapper}>
          <Image
            priority
            fill
            sizes="50vw"
            placeholder="blur"
            blurDataURL="/images/landing_hero.png"
            src="/images/landing_hero.png"
            alt="taskify 히어로 이미지"
          />
        </div>
        <h1 className={styles.heading}>
          새로운 일정 관리 <span className={styles.violet}>Taskify</span>
        </h1>
        <Link href="/signin" className={styles.button}>
          로그인하기
        </Link>
      </section>
    </>
  );
};

export default HeroSection;
