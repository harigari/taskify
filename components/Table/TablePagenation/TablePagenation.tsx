import ProfileIcon from "@/components/Header/Members/ProfileIcon";
import { colorMapping } from "@/utils/colorMapping";
import Image from "next/image";
import { useMemo, useState } from "react";
import styles from "./TablePagenation.module.css";
import TableList from "@/components/Table/TableList/TableList";
import InviteButton from "@/components/Table/TablePagenation/InviteButton";
import TableIndex from "@/components/Table/TableIndex/TableIndex";
import HideButton from "@/components/Table/TablePagenation/HideButton";

interface Member {
  nickname: string;
  id: number;
  profileImageUrl?: string;
}

interface InviteBoard {
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

interface TableProps {
  title: string;
  data: Member[] | InviteBoard[];
  row?: number;
  tableindex: { [a: string]: string };
  invite?: boolean;
}

const TablePagenation = ({ title, data, row = Infinity, tableindex, invite = false }: TableProps) => {
  const column = Object.keys(tableindex).length;
  const entirePageNum = Math.ceil(data.length / row);
  const [pageCount, setPageCount] = useState(1);
  const [rowNum, setRowNum] = useState(row);
  const rowData = useMemo(() => data.slice(rowNum - row, rowNum), [data, row, rowNum]);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <article className={styles.container}>
      <div className={styles.title}>
        <h2 className={styles.title__text}>{title}</h2>
        <div className={styles.pagecount}>
          {entirePageNum > 1 && (
            <>
              <span className={styles.pagecount__text}>{`${pageCount} 페이지 중 ${entirePageNum}`}</span>
              <button
                className={styles.arrowbutton}
                onClick={() => {
                  setPageCount((prev) => (prev > 1 ? prev - 1 : 1));
                  setRowNum((prev) => (prev - row > 0 ? prev - row : prev));
                }}
              >
                {"<"}
              </button>
              <button
                className={styles.arrowbutton}
                onClick={() => {
                  setPageCount((prev) => (prev < entirePageNum ? prev + 1 : prev));
                  setRowNum((prev) => (prev < data.length ? prev + row : prev));
                }}
              >
                {">"}
              </button>
            </>
          )}
          {invite && <InviteButton />}
        </div>
      </div>
      {isOpen && (
        <>
          <TableIndex data={rowData} tableindex={tableindex} invite={invite} />
          <TableList data={rowData} tableindex={tableindex} row={row} />
        </>
      )}
      <HideButton isOpen={isOpen} setIsOpen={setIsOpen} />
    </article>
  );
};

export default TablePagenation;
