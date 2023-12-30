import { ReactNode } from "react";
import style from "./ChipNum.module.css";

interface ChipNumProps {
  children: ReactNode;
}

const ChipNum = ({ children }: ChipNumProps) => {
  return (
    <>
      <div className={`${style.container}`}>
        <div className={`${style.wrapper}`}>{children}</div>
      </div>
    </>
  );
};
export default ChipNum;
