import { InviteBoard, Member, Tableindex } from "@/components/Table/Table.type";
import InviteButton from "@/components/Table/TablePagenation/InviteButton";
import clsx from "clsx";
import styles from "./TableIndex.module.css";

interface TableIndexProps {
  data: (Member | InviteBoard)[];
  tableindex: Tableindex;
  invite?: boolean;
}

const TableIndex = ({ tableindex, invite = false }: TableIndexProps) => {
  const column = Object.keys(tableindex).length;
  const isAccept = Object.values(tableindex).includes("acceptButton");

  return (
    <div
      className={clsx(styles.tableindex, isAccept && styles.tableindex__mobile)}
      style={{
        gridTemplateColumns: `repeat(${column - 1}, minmax(max-content, 1fr)) ${invite ? "auto" : `minmax(1rem,8rem)`}`,
      }}
    >
      {Object.keys(tableindex).map(
        (index) =>
          index && (
            <p
              className={clsx(
                styles.tableindex__item,
                tableindex[index] === "acceptButton" && styles.tableindex__acceptbutton
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