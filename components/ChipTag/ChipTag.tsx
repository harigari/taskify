import clsx from "clsx";
import { useState, useEffect } from "react";
import style from "./ChipTag.module.css";

const ChipTag = ({ name, size }) => {
  const [color, setColor] = useState("");
  const getColorFromFirstLetter = (firstLetter) => {
    switch (true) {
      case (firstLetter >= "a" && firstLetter < "g") || (firstLetter >= "가" && firstLetter < "라"):
        return "tag1";
      case (firstLetter >= "g" && firstLetter < "m") || (firstLetter >= "라" && firstLetter < "사"):
        return "tag2";
      case (firstLetter >= "m" && firstLetter < "s") || (firstLetter >= "사" && firstLetter < "차"):
        return "tag3";
      case (firstLetter >= "s" && firstLetter <= "z") || (firstLetter >= "차" && firstLetter < "힣"):
        return "tag4";
      default:
        return "default";
    }
  };

  useEffect(() => {
    const firstLetter = name.charAt(0).toLowerCase(); // 문자열의 첫 글자를 소문자로 변환
    const tagColor = getColorFromFirstLetter(firstLetter);
    setColor(tagColor);
  }, [name]);

  return (
    <>
      <div
        className={clsx(
          style.container,
          { [style.large]: size === "large" },
          { [style.tag1]: color === "tag1" },
          { [style.tag2]: color === "tag2" },
          { [style.tag3]: color === "tag3" },
          { [style.tag4]: color === "tag4" },
          { [style.default]: color === "default" }
        )}
      >
        {/* prop에 따라 글자 내용 변경 */}
        <div>{name}</div>
      </div>
    </>
  );
};

export default ChipTag;
