import Image from "next/image";
import { useMemo, useState } from "react";
import styles from "./Table.module.css";
import ProfileIcon from "@/components/Header/Members/ProfileIcon";
import { colorMapping } from "@/utils/colorMapping";

interface TableProps {
  title: string;
  data: {}[];
  row?: number;
  tableindex: { [a: string]: string };
}

const Table = ({ title, data, row = Infinity, tableindex }: TableProps) => {
  const column = Object.keys(tableindex).length;
  const entirePageNum = Math.ceil(data.length / row);
  const [pageCount, setPageCount] = useState(1);
  const [rowNum, setRowNum] = useState(row);
  const rowData = useMemo(() => data.slice(rowNum - row, rowNum), [data, row, rowNum]);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <article className={styles.container}>
      <div className={styles.title}>
        <h1 className={styles.title__text}>{title}</h1>
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
        </div>
      </div>
      {isOpen && (
        <>
          <div
            className={styles.tableindex}
            style={{ gridTemplateColumns: `repeat(${column - 1}, 1fr) minmax(1rem, 8rem)` }}
          >
            {Object.keys(tableindex).map((index) => (
              <p className={styles.tableindex__item} key={index}>
                {index}
              </p>
            ))}
          </div>
          <ul className={styles.tablerows}>
            {rowData.map((data, idx) => {
              const arr = [];
              for (const v of Object.values(tableindex)) {
                switch (v) {
                  case "button":
                    arr.push(
                      <button className={styles.button} key={v}>
                        버튼
                      </button>
                    );
                    continue;
                  case "nickname":
                    arr.push(
                      <div className={styles.row__item} key={data[v]}>
                        <ProfileIcon member={data} />
                        <p className={styles.row__item}>{data[v]}</p>
                      </div>
                    );
                    continue;
                  case "dashboard":
                    if (!data[v]) continue;
                    arr.push(
                      <div className={styles.row__item} key={data[v].title}>
                        <div className={styles.row__icon} style={{ backgroundColor: colorMapping(data[v].title) }} />
                        <p>{data[v].title}</p>
                      </div>
                    );
                    continue;
                  case "invitee":
                    if (!data[v]) continue;
                    arr.push(
                      <p className={styles.row__item} key={data[v].nickname}>
                        {data[v].nickname}
                      </p>
                    );
                    continue;
                  default:
                    arr.push(
                      <p className={styles.row__item} key={v}>
                        {data[v]}
                      </p>
                    );
                }
              }

              return (
                <li
                  className={styles.row}
                  style={{ gridTemplateColumns: `repeat(${column - 1}, minmax(0, 1fr)) minmax(1rem, 8rem)` }}
                  key={idx}
                >
                  {arr}
                </li>
              );
            })}
            {row !== Infinity &&
              rowData.length < row &&
              Array(row - rowData.length)
                .fill("")
                .map((v, i) => <li className={styles.row} key={i}></li>)}
          </ul>
        </>
      )}
      <button className={styles.hidebutton} onClick={() => setIsOpen((prev) => !prev)}>
        <Image
          width={14}
          height={7}
          src={`/images/icons/icon-arrow${isOpen ? "up" : "down"}.svg`}
          alt={`${title}테이블 숨기기 버튼`}
        />
        {isOpen ? "접어두기" : "펼치기"}
      </button>
    </article>
  );
};

export default Table;
