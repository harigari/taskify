import InviteButton from "@/components/Table/TablePagination/InviteButton";
import { BasicUserType, InvitationData } from "@/types/api.type";
import clsx from "clsx";
import styles from "./TableIndex.module.css";
import InviteUserModal from "@/modals/InviteUserModal";

type TableIndexType = {
  [a: string]: "nickname" | "dashboard" | "inviter" | "email" | "deleteButton" | "acceptButton" | "cancelButton";
};

interface TableIndexProps {
  data: (BasicUserType | InvitationData)[];
  tableIndex: TableIndexType;
  invite?: boolean;
}

const TableIndex = ({ tableIndex, invite = false }: TableIndexProps) => {
  const column = Object.keys(tableIndex).length;
  const isAccept = Object.values(tableIndex).includes("acceptButton");

  return (
    <div
      className={clsx(styles.tableindex, isAccept && styles.tableindex__mobile)}
      style={{
        gridTemplateColumns: `repeat(${column - 1}, minmax(max-content, 1fr)) ${invite ? "auto" : `minmax(1rem,8rem)`}`,
      }}
    >
      {Object.keys(tableIndex).map(
        (index) =>
          index && (
            <p
              className={clsx(
                styles.tableindex__item,
                tableIndex[index] === "acceptButton" && styles.tableindex__acceptbutton
              )}
              key={index}
            >
              {index}
            </p>
          )
      )}
      {invite && <InviteUserModal className="tableindex" />}
      {/* {invite && <InviteButton className="tableindex" />} */}
    </div>
  );
};

export default TableIndex;
