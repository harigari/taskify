import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./RedoButton.module.css";

const RedoButton = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className={styles.backbutton}>
      <div className={styles.backbutton__img}>
        <Image fill src="/icons/icon-arrowleft.svg" alt="바로 전에 있던 위치로 이동합니다." />
      </div>
      <span>이전 페이지로 돌아가기</span>
    </button>
  );
};

export default RedoButton;
