import InviteButton from "@/components/Buttons/InviteButton/InviteButton";
import TableIndex from "@/components/Table/TableIndex/TableIndex";
import TableList from "@/components/Table/TableList/TableList";
import HideButton from "@/components/Table/TablePagination/HideButton";
import SearchInput from "@/components/Table/TablePagination/SearchInput";
import { BasicUserType, InvitationData } from "@/types/api.type";
import { useMemo, useState } from "react";
import styles from "./TableScroll.module.css";
import { useRouter } from "next/router";
import useInfScroll from "@/hooks/useInfScroll";

type Pagination = {
  id: number;
  size: number;
  cursorId?: number;
};

type TableIndexType = {
  [a: string]: "nickname" | "dashboard" | "inviter" | "email" | "deleteButton" | "acceptButton" | "cancelButton";
};

interface TableProps {
  title: string;
  row?: number;
  tableIndex: TableIndexType;
  invite?: boolean;
  search?: boolean;
}

const TableScroll = ({ title, row = 6, tableIndex, invite = false, search = false }: TableProps) => {
  const [data, setData] = useState<BasicUserType[] | InvitationData[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [keyword, setKeyword] = useState("");
  const rowData = useMemo(
    () =>
      keyword
        ? data?.filter((v) => {
            if ("dashboard" in v) {
              return [v.dashboard.title, v.inviter.nickname, v.inviter.email].some((v) => v.includes(keyword));
            }
            if ("nickname" in v) {
              return v.nickname.includes(keyword);
            }
          })
        : data,
    [data]
  );

  const router = useRouter();

  const { isVisible, setIsVisible, myRef } = useInfScroll();

  const [pagination, setPagination] = useState<Pagination>({
    id: columnId,
    size: 5,
  });

  //  카드리스트 가져오기
  const [cardList, setCardList] = useState<CardData[]>([]);

  const getComments = async () => {
    const { id, size, cursorId } = pagination;
    let response;
    if (cursorId) {
      response = await sender.get({ path: "cards", id, size, cursorId, accessToken });
    } else {
      response = await sender.get({ path: "cards", id, size, accessToken });
    }

    if (response.status !== 200) return;

    const { cards, cursorId: cursor, totalCount } = response.data;

    setPagination((prevValue) => {
      return { ...prevValue, cursorId: cursor };
    });
    setCardList((prevValue) => [...prevValue, ...cards]);
    setIsVisible(false);
    setTotalCount(totalCount);
  };

  useEffect(() => {
    if (pagination.cursorId === null) return;
    if (isVisible) {
      getComments();
    }
  }, [isVisible]);

  return (
    <article className={styles.container}>
      <div className={styles.title}>
        <h2 className={styles.title__text}>{title}</h2>
        {invite && <InviteButton setData={setData} boardId={Number(router.query.boardId)} usage="edit_page" />}
      </div>

      {isOpen && (
        <>
          {search && <SearchInput setKeyword={setKeyword} />}
          <TableIndex data={rowData} tableIndex={tableIndex} invite={invite} />
          <TableList data={rowData} setData={setData} tableIndex={tableIndex} />
        </>
      )}
      <HideButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <p ref={myRef}></p>
    </article>
  );
};

export default TableScroll;
