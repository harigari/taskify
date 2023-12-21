import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction } from "react";
import styles from "./TagInput.module.css";
import ChipTag from "@/components/Chip/ChipTag/ChipTag.tsx";

interface TagInputProp {
  tagList: string[];
  setTagList: Dispatch<SetStateAction<string[]>>;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

function TagInput({ tagList, setTagList, value, setValue }: TagInputProp) {
  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && value !== "") {
      const isAlreadyInList = tagList.find((tag) => tag === value);

      if (!isAlreadyInList) {
        setTagList((prevList) => {
          return [value, ...prevList];
        }); // 중복된 태그 입력 방지
      }

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const placeholder = tagList.length !== 0 ? "" : "입력 후 Enter";

  return (
    <>
      <div className={styles.root}>
        <div className={styles.tagContainer}>
          {tagList.map((tag) => {
            return (
              <ChipTag key={tag} size="lg">
                {tag}
              </ChipTag>
            ); // 중복된 태그 입력이 방지되었기 때문에 key를 tag 값으로 다루는 것이 가능해짐
          })}
        </div>
        <input
          className={styles.input}
          value={value}
          onKeyDown={handleEnter}
          onChange={handleChange}
          placeholder={placeholder}
        ></input>
      </div>
    </>
  );
}

export default TagInput;
