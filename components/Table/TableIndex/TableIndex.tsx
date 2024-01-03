import { InvitationData, Member } from "@/types/api.type";
import clsx from "clsx";
import styles from "./TableIndex.module.css";
import InviteButton from "@/components/Buttons/InviteButton/InviteButton";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";

type TableIndexType = {
  [a: string]: "nickname" | "dashboard" | "inviter" | "email" | "deleteButton" | "acceptButton" | "cancelButton";
};

interface TableIndexProps {
  data: (Member | InvitationData)[];
  tableIndex: TableIndexType;
  invite?: boolean;
  setData?: Dispatch<SetStateAction<(Member | InvitationData)[]>>;
}

const TableIndex = ({ tableIndex, invite = false, setData }: TableIndexProps) => {
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
      {invite && <InviteButton usage="edit_page" setData={setData} className="tableindex" />}
    </div>
  );
};

export default TableIndex;
