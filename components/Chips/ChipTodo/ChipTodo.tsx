import clsx from "clsx";
import { ReactNode } from "react";
import style from "./ChipTodo.module.css";

interface ChipTodoProps {
  size: "sm" | "lg";
  color: "purple" | "white";
  children: ReactNode;
}

const ChipTodo = ({ size, color, children }: ChipTodoProps) => {
  return (
    <>
      <div className={clsx(style.container, { [style.large]: size === "lg" }, { [style.white]: color === "white" })}>
        <div className={style.icon} />
        {/* prop에 따라 글자 내용 변경 */}
        <div
          className={clsx(
            style.wrapper,
            { [style.largeText]: size === "lg" },
            { [style.whiteText]: color === "white" }
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default ChipTodo;
