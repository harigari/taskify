import { Member } from "@/components/Header/Header.type";
import styles from "./TableList.module.css";
import { InviteBoard, Tableindex } from "@/components/Table/TableScroll/TableScroll";
import ProfileIcon from "@/components/Header/Members/ProfileIcon";
import { colorMapping } from "@/utils/colorMapping";

interface TableListProps {
  data: Member[] | InviteBoard[];
  tableindex: Tableindex;
  row: number;
}

const TableList = ({ data, tableindex, row }: TableListProps) => {
  const column = Object.keys(tableindex).length;

  return (
    <ul>
      {data.map((data, idx) => {
        const arr = [];
        for (const key of Object.keys(tableindex)) {
          const v = tableindex[key];
          switch (v) {
            case "button":
              arr.push(
                <button className={styles.button} key={v}>
                  버튼
                </button>
              );
              continue;
            case "nickname":
              if (!(v in data)) continue;
              arr.push(
                <div className={styles.row__item} key={data[v]}>
                  <ProfileIcon member={data} />
                  <p className={styles.row__item}>{data[v]}</p>
                </div>
              );
              continue;
            case "dashboard":
              if (!(v in data)) continue;
              arr.push(
                <div className={styles.row__item} key={data[v].title}>
                  <div className={styles.row__icon} style={{ backgroundColor: colorMapping(data[v].title) }} />
                  <p>{data[v].title}</p>
                </div>
              );
              continue;
            case "invitee":
              if (!(v in data)) continue;
              arr.push(
                <p className={styles.row__item} key={data[v].nickname}>
                  {data[v].nickname}
                </p>
              );
              continue;
            case "email":
              if ("invitee" in data) {
                arr.push(
                  <div className={styles.row__item} key={data.invitee[v]}>
                    <ProfileIcon member={data.invitee} />
                    <p className={styles.row__item}>{data.invitee[v]}</p>
                  </div>
                );
              }
              continue;
            default:
              arr.push(null);
          }
        }

        return (
          <li
            className={styles.row}
            style={{ gridTemplateColumns: `repeat(${column - 1}, minmax(max-content, 1fr)) minmax(1rem, 8rem)` }}
            key={idx}
          >
            {arr}
          </li>
        );
      })}
      {row !== Infinity &&
        data.length < row &&
        Array(row - data.length)
          .fill("")
          .map((v, i) => <li className={styles.row} key={i}></li>)}
    </ul>
  );
};

export default TableList;
