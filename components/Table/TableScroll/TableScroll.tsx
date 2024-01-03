import InviteButton from "@/components/Buttons/InviteButton/InviteButton";
import TableIndex from "@/components/Table/TableIndex/TableIndex";
import TableList from "@/components/Table/TableList/TableList";
import HideButton from "@/components/Table/TablePagination/HideButton";
import SearchInput from "@/components/Table/TablePagination/SearchInput";
import { BasicUserType, InvitationData } from "@/types/api.type";
import { useEffect, useMemo, useState } from "react";
import styles from "./TableScroll.module.css";
import { useRouter } from "next/router";
import useInfScroll from "@/hooks/useInfScroll";
import sender from "@/apis/sender";
import { getAccessTokenFromDocument } from "@/utils/getAccessToken";

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
  type: "dashboardInvitations" | "invitations";
  row?: number;
  tableIndex: TableIndexType;
  invite?: boolean;
  search?: boolean;
}

const TableScroll = ({ title, type, row = 5, tableIndex, invite = false, search = false }: TableProps) => {
  const router = useRouter();

  const { isVisible, setIsVisible, myRef } = useInfScroll();
  const [pagination, setPagination] = useState<Pagination>({
    id: Number(router.query.boardId),
    size: 5,
  });
  const [data, setData] = useState<(BasicUserType | InvitationData)[]>([]);
  const getScrollData = async () => {
    const accessToken = getAccessTokenFromDocument("accessToken");
    const { id, size, cursorId } = pagination;
    let response;
    if (cursorId) {
      response = await sender.get({ path: type, id, size, cursorId, accessToken });
    } else {
      response = await sender.get({ path: type, id, size, accessToken });
    }

    if (response.status !== 200) return;
    setIsVisible(false);

    if ("cursorId" in response.data) {
      const { invitations, cursorId: cursor } = response.data;
      setData((prevValue) => [...prevValue, ...invitations]);
      setPagination((prevValue) => {
        return { ...prevValue, cursorId: cursor };
      });
      return;
    }
  };

  useEffect(() => {
    if (pagination.cursorId === null) return;
    if (isVisible) {
      getScrollData();
    }
  }, [isVisible]);

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
