import styles from "@/components/header/index/IndexHeader.module.css";
import { IndexHeaderProps } from "@/components/header/header.type";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const IndexHeader = ({ color = "white" }: IndexHeaderProps) => {
  return (
    <>
      <header
        className={clsx(styles.header, {
          [styles.header__black]: color === "black",
        })}
      >
        <Link className={styles.logo__link} href="/mydashboard">
          <picture className={styles.logo__picture}>
            <source media="(max-width: 767px)" srcSet={`/images/logo-${color === "white" ? "purple" : "white"}.svg`} />
            <Image
              width={110}
              height={35}
              priority
              src={`/images/logo-${color === "white" ? "purple" : "white"}-horizontal.png`}
              alt="홈페이지로 바로가기"
            />
          </picture>
        </Link>
        <Link className={styles.login__link} href="/login">
          로그인
        </Link>
        <Link className={styles.signup__link} href="/signup">
          회원가입
        </Link>
      </header>
    </>
  );
};

export default IndexHeader;
