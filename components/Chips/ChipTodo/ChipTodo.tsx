import clsx from "clsx";
import style from "./ChipTodo.module.css";
import { ChipTodoProps } from "@/components/Chips/chips.type";

const ChipTodo = ({ size, color, children }: ChipTodoProps) => {
  return (
    <>
      <div className={clsx(style.container, { [style.large]: size === "lg" }, { [style.white]: color === "white" })}>
        <img src="/icons/todo_dot.svg" />
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
