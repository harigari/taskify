import ChipTag from "@/components/Chips/ChipTag/ChipTag";
import styles from "./TagInput.module.css";
import { useState } from "react";

const TagList = ({ tag, onClick }: { tag: string; onClick: any }) => {
  const [hover, setHover] = useState(false);

  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseOut = () => {
    setHover(false);
  };

  const handleClick = () => {
    onClick(tag);
  };

  return (
    <div className={styles.chipTagWrapper} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {hover && <button className={styles.tagDeleteButton} type="button" onClick={handleClick} />}
      <ChipTag size="lg">{tag}</ChipTag>
    </div>
  );
};

export default TagList;
