import TableIndex from "@/components/Table/TableIndex/TableIndex";
import TableList from "@/components/Table/TableList/TableList";
import { INVITE } from "@/pages/dashboard";
import styles from "./TableScroll.module.css";
import { InviteBoard, Tableindex } from "@/components/Table/Table.type";

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
