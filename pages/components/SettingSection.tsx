import React from "react";
import styles from "./SettingSection.module.css";
import Image from "next/image";
import clsx from "clsx";

interface SettingData {
  id: number;
  alt: string;
  imageSrc: string;
  heading: string;
  description: string;
}

const settingData: SettingData[] = [
  {
    id: 1,
    alt: "대시 보드 설정 이미지",
    imageSrc: "/images/landing_setting1.png",
    heading: "대시보드 설정",
    description: "대시보드 사진과 이름을 변경할 수 있어요.",
  },
  {
    id: 2,
    alt: "새로운 팀원 초대 이미지",
    imageSrc: "/images/landing_setting2.png",
    heading: "초대",
    description: "새로운 팀원을 초대할 수 있어요.",
  },
  {
    id: 3,
    alt: "구성원 초대 이미지",
    imageSrc: "/images/landing_setting3.png",
    heading: "구성원",
    description: "구성원을 초대하고 내보낼 수 있어요.",
  },
];

const SettingArticle = ({ alt, imageSrc, heading, description }: SettingData) => (
  <article className={styles.setting_article}>
    <div className={styles.setting_image_wrapper}>
      <Image sizes="50vw" fill alt={alt} src={imageSrc} />
    </div>
    <div className={styles.setting_description}>
      <h3 className={clsx(styles.heading, styles.setting_h3)}>{heading}</h3>
      <span>{description}</span>
    </div>
  </article>
);

const SettingSection = () => (
  <section className={styles.setting_section}>
    <h2 className={clsx(styles.heading, styles.setting_h2)}>생산성을 높이는 다양한 설정 ⚡️</h2>
    <div className={styles.setting_container}>
      {settingData.map((data) => (
        <SettingArticle key={data.id} {...data} />
      ))}
    </div>
  </section>
);

export default SettingSection;
