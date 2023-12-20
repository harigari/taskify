import clsx from "clsx";
import style from "./ChipTodo.module.css";
const ChipTodo = ({ name, size }) => {
  return (
    <>
      <div className={clsx(style.container, { [style.large]: size === "large" })}>
        <img src="/todoDot.svg" />
        {/* prop에 따라 글자 내용 변경 */}
        <div className={clsx(style.wrapper, { [style.largeText]: size === "large" })}>{name}</div>
      </div>
    </>
  );
};

export default ChipTodo;
