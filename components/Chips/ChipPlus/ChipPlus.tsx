import Image from "next/image";
import style from "./ChipPlus.module.css";
import clsx from "clsx";

interface ChipPlusProps {
  size: "sm" | "lg";
}

const ChipPlus = ({ size }: ChipPlusProps) => {
  return (
    <>
      <div className={clsx(style.imageWrapper, { [style.large]: size === "lg" })}>
        <Image width={16} height={16} src="/icons/add.svg" alt="추가하기" />
      </div>
    </>
  );
};

export default ChipPlus;
