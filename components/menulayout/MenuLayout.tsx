import Header from "@/components/header/Header";
import Sidemenu from "@/components/sidemenu/Sidemenu";
import { ReactNode } from "react";
import styles from "./MenuLayout.module.css";
import { clsx } from "clsx";

interface Props {
  children: ReactNode;
}

const MenuLayout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.grid__sidemenu}>
        <Sidemenu />
      </div>
      <div className={styles.grid__header}>
        <Header />
      </div>
      <div className={styles.grid__main}>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default MenuLayout;
