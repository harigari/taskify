import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction } from "react";
import styles from "./TagInput.module.css";
import ChipTag from "@/components/ChipTag/ChipTag.tsx";

interface TagInputProp {
  tagList: string[];
  setTagList: Dispatch<SetStateAction<string[]>>;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

function TagInput({ tagList, setTagList, value, setValue }: TagInputProp) {
  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && value !== "") {
      setTagList((prevList) => {
        return [value, ...prevList];
      });
      setValue("");
    }

    if (event.key === "Backspace" && value === "") {
      setTagList((prevList) => {
        const updatedList = [...prevList]; // 이전 배열을 복제합니다.
        updatedList.shift(); // 첫 번째 요소를 제거합니다.
        return updatedList;
      });
    }
  };

  console.log(tagList);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const place = tagList.length !== 0 ? "" : "입력 후 Enter";

  return (
    <>
      <div className={styles.root}>
        <div className={styles.tagContainer}>
          {tagList.map((tag, index) => {
            return <ChipTag key={index}>{tag}</ChipTag>;
          })}
        </div>
        <input
          className={styles.input}
          value={value}
          onKeyDown={handleEnter}
          onChange={handleChange}
          placeholder={place}
        ></input>
      </div>
    </>
  );
}

export default TagInput;
