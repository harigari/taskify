import clsx from "clsx";
import { ReactNode } from "react";
import style from "./ChipTag.module.css";
import makeColorForChip from "@/utils/makeColorForChip";

interface ChipTagProps {
  size: "sm" | "lg";
  children: ReactNode;
}

const ChipTag = ({ size, children }: ChipTagProps) => {
  const [backgroundColor, fontColor] = makeColorForChip(children as string);

  return (
    <>
      <div
        className={clsx(style.container, { [style.large]: size === "lg" })}
        style={{ backgroundColor, color: fontColor }}
      >
        {/* prop에 따라 글자 내용 변경 */}
        <div>{children}</div>
      </div>
    </>
  );
};

export default ChipTag;
