import Header from "@/components/Header/Header";
import Sidemenu from "@/components/Sidemenu/Sidemenu";
import { ReactNode } from "react";
import styles from "./MenuLayout.module.css";
import { DashBoardData } from "@/types/api.type";

interface Props {
  children: ReactNode;
  dashboardList: DashBoardData[];
}

const MenuLayout = ({ dashboardList, children }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.grid__sidemenu}>
        <Sidemenu dashboardList={dashboardList} />
      </div>
      <div className={styles.grid__header}>
        <Header />
      </div>
      <div className={styles.grid__main}>{children}</div>
    </div>
  );
};

export default MenuLayout;
