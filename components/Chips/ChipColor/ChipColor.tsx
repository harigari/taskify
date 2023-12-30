import clsx from "clsx";
import style from "./ChipColor.module.css";
import Image from "next/image";

interface ChipColorProps {
  size: string;
  color: "green" | "purple" | "orange" | "blue" | "pink";
  onClick?: () => void;
  isSelected: boolean;
}

const ChipColor = ({ size, color, onClick, isSelected }: ChipColorProps) => {
  return (
    <>
      <div
        className={clsx(
          style.container,
          { [style.large]: size === "lg" },
          { [style.green]: color === "green" },
          { [style.purple]: color === "purple" },
          { [style.orange]: color === "orange" },
          { [style.blue]: color === "blue" },
          { [style.pink]: color === "pink" }
        )}
        onClick={onClick}
      >
        {/* 크기에 따라 check.svg 변경 */}
        {isSelected ? <Image width={22} height={22} src="/icons/check_small.svg" alt="선택된 태그" /> : null}
      </div>
    </>
  );
};

export default ChipColor;
