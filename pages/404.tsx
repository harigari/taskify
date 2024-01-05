// /pages/404.js
import Image from "next/image";
import Link from "next/link";
import styles from "./404.module.css";
import Button from "@/components/Buttons/Button/Button";

export default function NotFoundPage() {
  return (
    <div className={styles.root}>
      <p className={styles.p}>길을 잃었다</p>
      <Image src="/images/404.webp" width="500" height="300" alt="" />
      <h1 className={styles.h1}>어딜 가야 할까</h1>
      <ul>
        <Button buttonType="login" color="white">
          <Link href="/mydashboard">Go home</Link>
        </Button>
      </ul>
    </div>
  );
}
