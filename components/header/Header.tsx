import styles from "@/components/header/Header.module.css";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface Props {
  color: "white" | "black";
}

const Header = ({ color = "white" }: Props) => {
  return (
    <>
      <header
        className={clsx(styles.header, {
          [styles.header__black]: color === "black",
        })}
      >
        <Link className={styles.logo__link} href="/mydashboard">
          <picture>
            <source media="(max-width: 375px)" srcSet={`/images/logo-${color === "white" ? "purple" : "white"}.svg`} />
            <Image
              fill
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

export default Header;
