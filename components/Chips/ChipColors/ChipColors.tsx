import { Dispatch, DispatchWithoutAction, SetStateAction, useState } from "react";
import style from "./ChipColors.module.css";
import ChipColor from "../ChipColor/ChipColor";
import { ColorType } from "@/types/api.type";

// interface ChipColorProps {
//   size: string;
//   color: "green" | "purple" | "orange" | "blue" | "pink";
//   onClick?: () => void;
//   isSelected: boolean;
// }

interface ChipColorsProps {
  selectedColor: ColorType;
  setSelectedColor: Dispatch<SetStateAction<ColorType>>;
  size: "sm" | "lg";
}

const ChipColors = ({ selectedColor, setSelectedColor, size }: ChipColorsProps) => {
  const handleColorClick = (color: ChipColorsProps["selectedColor"]) => {
    setSelectedColor(color);
  };

  return (
    <>
      <div className={style.container}>
        <ChipColor
          size={size}
          color="green"
          onClick={() => handleColorClick("#7ac555")}
          isSelected={selectedColor === "#7ac555"}
        />
        <ChipColor
          size={size}
          color="purple"
          onClick={() => handleColorClick("#760dde")}
          isSelected={selectedColor === "#760dde"}
        />
        <ChipColor
          size={size}
          color="orange"
          onClick={() => handleColorClick("#ffa500")}
          isSelected={selectedColor === "#ffa500"}
        />
        <ChipColor
          size={size}
          color="blue"
          onClick={() => handleColorClick("#76a5ea")}
          isSelected={selectedColor === "#76a5ea"}
        />
        <ChipColor
          size={size}
          color="pink"
          onClick={() => handleColorClick("#e876ea")}
          isSelected={selectedColor === "#e876ea"}
        />
      </div>
    </>
  );
};

export default ChipColors;
