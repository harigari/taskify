import Image from "next/image";
import styles from "./Sidemenu.module.css";
import Link from "next/link";

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
  return (
    <aside className={styles.container}>
      <Link href="/mydashboard">
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
      <ul className={styles.list}>
        <button className={styles.list__addbutton}>
          <p className={styles.list__addbutton__text}>Dash Boards</p>
          <Image width={20} height={20} src="/images/icon-addbox.svg" alt="대시보드 추가하기" />
        </button>
        {MOCKUP.map((board) => (
          <li key={board.id}>
            <Link className={styles.list__item__link} href={`/dashboard/${board.id}`}>
              <div className={styles.list__item__icon} style={{ backgroundColor: `var(--${board.color})` }} />
              <p className={styles.list__item__text}>{board.title}</p>
              {board.createdByMe && (
                <Image
                  className={styles.list__item__img}
                  width={18}
                  height={14}
                  src="/images/icon-crown.svg"
                  alt="내가 생성한 대시보드"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidemenu;
