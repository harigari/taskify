import { useState } from "react";
import clsx from "clsx";
import style from "./ChipColor.module.css";
const ChipColor = ({ size, color, onClick, isSelected }) => {
  return (
    <>
      <div
        className={clsx(
          style.container,
          { [style.large]: size === "large" },
          { [style.green]: color === "green" },
          { [style.purple]: color === "purple" },
          { [style.orange]: color === "orange" },
          { [style.blue]: color === "blue" },
          { [style.pink]: color === "pink" }
        )}
        onClick={onClick}
      >
        {/* 크기에 따라 check.svg 변경 */}
        {isSelected ? <img src="/checkSmall.svg" /> : null}
      </div>
    </>
  );
};

export default ChipColor;
