import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";
import TableIndex from "@/components/Table/TableIndex/TableIndex";
import TableList from "@/components/Table/TableList/TableList";
import HideButton from "@/components/Table/TablePagination/HideButton";
import SearchInput from "@/components/Table/TablePagination/SearchInput";
import { BasicUserType, InvitationData } from "@/types/api.type";
import { clsx } from "clsx";
import Image from "next/image";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import styles from "./TablePagination.module.css";
import InviteButton from "@/components/Buttons/InviteButton/InviteButton";

import { useRouter } from "next/router";

type TableIndexType = {
  [a: string]: "nickname" | "dashboard" | "inviter" | "email" | "deleteButton" | "acceptButton" | "cancelButton";
};

interface TableProps {
  title: string;
  data: BasicUserType[] | InvitationData[];
  row?: number;
  tableIndex: TableIndexType;
  invite?: boolean;
  search?: boolean;
  setData: Dispatch<SetStateAction<BasicUserType[]>> | Dispatch<SetStateAction<InvitationData[]>>;
}

const TablePagination = ({
  title,
  data = [],
  row = Infinity,
  tableIndex,
  invite = false,
  search = false,
  setData,
}: TableProps) => {
  const router = useRouter();
  const boardId = Number(router.query.boardId);

  const entirePageNum = Math.ceil(data.length / row);
  const [pageCount, setPageCount] = useState(1);
  const [rowNum, setRowNum] = useState(row);
  const [keyword, setKeyword] = useState("");
  const rowData = useMemo(
    () =>
      keyword
        ? data.filter((v) => {
            if ("dashboard" in v) {
              return [v.dashboard.title, v.inviter.nickname, v.inviter.email].some((v) => v.includes(keyword));
            }
            if ("nickname" in v) {
              return v.nickname.includes(keyword);
            }
          })
        : data.slice(rowNum - row, rowNum),
    [data, row, rowNum, keyword]
  );
  const [isOpen, setIsOpen] = useState(true);
  const isAccept = Object.values(tableIndex).includes("acceptButton");

  return (
    <article className={styles.container}>
      <div className={styles.title}>
        <h2 className={styles.title__text}>{title}</h2>
        {entirePageNum > 1 && (
          <div className={clsx(styles.pagecount, isAccept && styles.pagecount__mobile)}>
            <span className={styles.pagecount__text}>{`${pageCount} 페이지 중 ${entirePageNum}`}</span>
            <ArrowButton
              disabled={pageCount === 1}
              onClick={() => {
                setPageCount((prev) => (prev > 1 ? prev - 1 : 1));
                setRowNum((prev) => (prev - row > 0 ? prev - row : prev));
              }}
            />
            <ArrowButton
              right
              disabled={pageCount === entirePageNum}
              onClick={() => {
                setPageCount((prev) => (prev < entirePageNum ? prev + 1 : prev));
                setRowNum((prev) => (prev < data.length ? prev + row : prev));
              }}
            />
          </div>
        )}
        {invite && <InviteButton setData={setData} boardId={boardId} usage="edit_page" />}
      </div>
      {data.length > 0 ? (
        <>
          {isOpen && (
            <>
              {search && <SearchInput setKeyword={setKeyword} />}
              <TableIndex data={rowData} tableIndex={tableIndex} invite={invite} />
              <TableList data={rowData} setData={setData} tableIndex={tableIndex} row={row} />
            </>
          )}
          <HideButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
      ) : (
        <div className={styles.empty}>
          <Image
            width={100}
            height={100}
            priority
            src="/icons/icon-noinvite-dashboard.svg"
            alt="초대 내역이 없습니다."
          />
          <p>초대 내역이 없습니다.</p>
        </div>
      )}
    </article>
  );
};

export default TablePagination;
