import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./Sidemenu.module.css";

const MOCKUP = [
  {
    id: 1,
    title: "행복해서",
    color: "green",
    createdByMe: true,
  },
  {
    id: 2,
    title: "웃는게 아니라",
    color: "purple",
    createdByMe: true,
  },
  {
    id: 3,
    title: "웃어서",
    color: "orange",
    createdByMe: false,
  },
  {
    id: 4,
    title: "행복한거다",
    color: "blue",
    createdByMe: false,
  },
  {
    id: 5,
    title: "중요!",
    color: "pink",
    createdByMe: true,
  },
];

const Sidemenu = () => {
  const [selected, setSelected] = useState(0);

  return (
    <aside className={styles.container}>
      <Link href="/mydashboard" className={styles.logo}>
        <picture>
          <source media="(max-width:767px)" srcSet="/images/logo-purple.svg" />
          <Image
            priority
            width={110}
            height={35}
            src="/images/logo-purple-horizontal.png"
            alt="나의 대시보드로 돌아가기"
          />
        </picture>
      </Link>
      <div className={styles.title}>
        <Link className={styles.title__link} href="/mydashboard">
          <p className={styles.title__text}>Dash Boards</p>
        </Link>
        <button className={styles.title__button}>
          <Image width={20} height={20} src="/icons/icon-addbox.svg" alt="대시보드 추가하기" />
        </button>
      </div>
      <ul className={styles.list}>
        {MOCKUP.map((board) => (
          <li key={board.id}>
            <button
              className={clsx(styles.item__button, { [styles.selected]: board.id === selected })}
              onClick={() => setSelected(board.id)}
            >
              <div className={styles.item__icon} style={{ backgroundColor: `var(--${board.color})` }} />
              <p className={styles.item__text}>{board.title}</p>
              {board.createdByMe && (
                <Image
                  className={styles.item__img}
                  width={18}
                  height={14}
                  src="/icons/icon-crown.svg"
                  alt="내가 생성한 대시보드"
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidemenu;
