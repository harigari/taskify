import Image from "next/image";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import styles from "./SearchInput.module.css";

interface SearchInputProps {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
}

const SearchInput = ({ keyword, setKeyword }: SearchInputProps) => {
  const input = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");

  const handleClick = () => {
    if (!input.current) return;
    setKeyword("");
    setValue("");
    input.current.focus();
  };

  return (
    <div className={styles.search}>
      <input
        ref={input}
        value={value}
        className={styles.search__input}
        placeholder="검색"
        onKeyUp={(e) => e.key === "Enter" && setKeyword(e.currentTarget.value)}
        onBlur={(e) => setKeyword(e.target.value)}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <button className={styles.search__button} onClick={handleClick}>
          <Image width={24} height={24} src="/images/icons/icon-close.svg" alt="검색어를 지웁니다." />
        </button>
      )}
      <Image
        className={styles.search__image}
        width={24}
        height={24}
        src="/images/icons/icon-search.svg"
        alt="검색어를 입력해주세요."
      />
    </div>
  );
};

export default SearchInput;
