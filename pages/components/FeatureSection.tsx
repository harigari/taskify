import React from "react";
import styles from "./FeatureSection.module.css";
import clsx from "clsx";
import Image from "next/image";
const FeatureSection = () => {
  return (
    <section className={styles.feature_section}>
      <article className={styles.feature_article}>
        <div className={styles.feature_intro}>
          <span className={styles.feature_number}>Point 1</span>
          <h2 className={clsx(styles.heading, styles.feature_h2)}>
            일의 우선순위를 <br />
            관리하세요
          </h2>
        </div>
        <div className={styles.flex_box1}>
          <div className={styles.feature_image_wrapper1}>
            <Image fill alt="우선순위 관리 기능 예시 이미지" src="/images/landing_feature1.png" />
          </div>
        </div>
      </article>

      <article className={clsx(styles.feature_article, styles.reverse)}>
        <div className={styles.feature_intro}>
          <span className={styles.feature_number}>Point 2</span>
          <h2 className={clsx(styles.heading, styles.feature_h2)}>
            해야 할 일을 <br />
            등록하세요
          </h2>
        </div>
        <div className={styles.flex_box2}>
          <div className={styles.feature_image_wrapper2}>
            <Image fill alt="할 일 생성 기능 예시 이미지" src="/images/landing_feature2.png" />
          </div>
        </div>
      </article>
    </section>
  );
};

export default FeatureSection;
