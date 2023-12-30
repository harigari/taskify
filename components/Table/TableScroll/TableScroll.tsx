import styles from "./TableScroll.module.css";

type TableIndexType = {
  [a: string]: "nickname" | "dashboard" | "inviter" | "email" | "deleteButton" | "acceptButton" | "cancelButton";
};

interface TableProps {
  title: string;
  row?: number;
  tableindex: TableIndexType;
}

const TableScroll = ({ title, row = 6, tableindex }: TableProps) => {
  return (
    <article className={styles.container}>
      <h2 className={styles.title__text}>{title}</h2>
      {/* <TableIndex data={data} tableindex={tableindex} />
      <TableList data={data} tableindex={tableindex} row={Math.min(data.length, row)} /> */}
    </article>
  );
};

export default TableScroll;
