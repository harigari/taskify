import IndexHeader from "@/components/header/indexheader/IndexHeader";
import Image from "next/image";
import styles from "./index.module.css";
import clsx from "clsx";
export default function Home() {
  return (
    <>
      <IndexHeader color="black" />
      <main className={styles.main}>
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

        {/* 두 번째 section */}
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
                <Image fill alt="우선순위 관리 기능 예시 이미지" src="/images/photos/landing_feature1.png" />
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
                <Image fill alt="할 일 생성 기능 예시 이미지" src="/images/photos/landing_feature2.png" />
              </div>
            </div>
          </article>
        </section>

        {/* 세 번째 section */}

        <section className={clsx(styles.setting_section)}>
          <h2 className={clsx(styles.heading, styles.setting_h2)}>생산성을 높이는 다양한 설정 ⚡️</h2>
          <div className={clsx(styles.setting_container)}>
            <article className={clsx(styles.setting_article)}>
              <div className={styles.setting_image_wrapper}>
                <Image fill alt="대시 보드 설정 이미지" src="/images/photos/landing_setting1.png" />
              </div>
              <div className={styles.setting_description}>
                <h3 className={clsx(styles.heading, styles.setting_h3)}>대시보드 설정</h3>
                <span>대시보드 사진과 이름을 변경할 수 있어요.</span>
              </div>
            </article>

            <article className={clsx(styles.setting_article)}>
              <div className={styles.setting_image_wrapper}>
                <Image fill alt="새로운 팀원 초대 이미지" src="/images/photos/landing_setting2.png" />
              </div>
              <div className={styles.setting_description}>
                <h3 className={clsx(styles.heading, styles.setting_h3)}>초대</h3>
                <span>새로운 팀원을 초대할 수 있어요.</span>
              </div>
            </article>

            <article className={clsx(styles.setting_article)}>
              <div className={styles.setting_image_wrapper}>
                <Image fill alt="구성원 초대 이미지" src="/images/photos/landing_setting3.png" />
              </div>
              <div className={styles.setting_description}>
                <h3 className={clsx(styles.heading, styles.setting_h3)}>구성원</h3>
                <span>구성원을 초대하고 내보낼 수 있어요.</span>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
