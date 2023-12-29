import { InviteBoard, Member, TableIndex } from "@/components/Table/Table.type";
import InviteButton from "@/components/Table/TablePagination/InviteButton";
import clsx from "clsx";
import styles from "./TableIndex.module.css";

interface TableIndexProps {
  data: (Member | InviteBoard)[];
  tableIndex: TableIndex;
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
      {invite && <InviteButton className="tableindex" />}
    </div>
  );
};

export default TableIndex;
