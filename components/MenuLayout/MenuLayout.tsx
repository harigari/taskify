import Header from "@/components/Header/Header";
import Sidemenu from "@/components/Sidemenu/Sidemenu";
import { ReactNode, useCallback, useRef } from "react";
import styles from "./MenuLayout.module.css";
import { DashBoardData } from "@/types/api.type";
import useDragScroll from "@/hooks/useDragScroll";

interface Props {
  children: ReactNode;
}

const MenuLayout = ({ children }: Props) => {
  const dragRef = useRef<HTMLDivElement>(null);
  useDragScroll(dragRef);

  return (
    <div className={styles.container}>
      <div className={styles.grid__sidemenu}>
        <Sidemenu />
      </div>
      <div className={styles.grid__header}>
        <Header />
      </div>
      <div className={styles.grid__main} ref={dragRef}>
        {children}
      </div>
    </div>
  );
};

export default MenuLayout;
