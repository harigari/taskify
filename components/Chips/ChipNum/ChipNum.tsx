import style from "./ChipNum.module.css";
import { ChipNumProps } from "@/components/Chips/chips.type";

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
