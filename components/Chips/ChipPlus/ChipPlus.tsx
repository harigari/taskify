import style from "./ChipPlus.module.css";
import clsx from "clsx";
import { ChipPlusProps } from "@/components/Chips/chips.type";
const ChipPlus = ({ size }: ChipPlusProps) => {
  return (
    <>
      <div className={clsx(style.imageWrapper, { [style.large]: size === "lg" })}>
        <img src="/images/icons/add.svg" />
      </div>
    </>
  );
};

export default ChipPlus;
