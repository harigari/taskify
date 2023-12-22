import { INVITE } from "@/pages/dashboard";
import TableList from "@/components/Table/TableList/TableList";
import TableIndex from "@/components/Table/TableIndex/TableIndex";
import styles from "./TableScroll.module.css";
import { useEffect } from "react";

export interface Member {
  nickname: string;
  id: number;
  profileImageUrl?: string;
}

export interface InviteBoard {
  id: number;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean;
}

export type Tableindex = { [a: string]: string };

interface TableProps {
  title: string;
  row?: number;
  tableindex: Tableindex;
}

const TableScroll = ({ title, row = 6, tableindex }: TableProps) => {
  const data: InviteBoard[] = INVITE;

  return (
    <article className={styles.container}>
      <h2 className={styles.title__text}>{title}</h2>
      <TableIndex data={data} tableindex={tableindex} />
      <TableList data={data} tableindex={tableindex} row={Math.min(data.length, row)} />
    </article>
  );
};

export default TableScroll;
