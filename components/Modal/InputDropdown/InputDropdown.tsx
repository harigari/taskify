import clsx from "clsx";
import styles from "@/components/Modal/Dropdown/Dropdown.module.css";
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Option from "./Option";
import Label from "@/components/Label/Label";
import Image from "next/image";
import { Member } from "@/hooks/useInputDropdownControll";
import Profile from "@/components/header/members/Profile";

interface DropdownProp {
  children: ReactNode;
  value: Member | null;
  setValue: Dispatch<SetStateAction<Member | null>>;
  options: Member[];
}

const optionFilter = (options: Member[], inputValue: string) => {
  const filteredMembers = options.filter((option) => option.nickname.includes(inputValue));
  return filteredMembers;
};

const InputDropdown = ({ options, value, setValue, children }: DropdownProp) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filtedOptions, setFiltedOptions] = useState<any[]>(options);

  const selectedStyle = clsx(styles.selected, isOpen && styles.selectedBorder);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    if (!value) {
      setIsOpen((prevValue) => !prevValue);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const filtedOptions = optionFilter(options, inputValue);
    setFiltedOptions(filtedOptions);
  }, [inputValue, options]);

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && filtedOptions.length > 0) {
      setValue(filtedOptions[0]);
      setIsOpen(false);
    }
  };

  return (
    <>
      <Label>{children}</Label>
      <div className={styles.root}>
        <div className={selectedStyle} onClick={handleClick}>
          {!value ? (
            <input
              className={styles.input}
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleEnter}
              placeholder="담당자를 검색해라 애송이"
            ></input>
          ) : (
            <div className={styles.selectedNickname}>
              <Profile member={value} idx={1} />
              <button
                type="button"
                className={styles.button}
                onClick={() => {
                  setValue(null);
                }}
              >
                <Image src="/images/icons/close.svg" alt="닫기 버튼" width={20} height={20} />
              </button>
            </div>
          )}
        </div>

        {isOpen && (
          <div className={styles.options}>
            {filtedOptions?.map((option) => {
              return (
                <Option value={value} setValue={setValue} setIsOpen={setIsOpen} option={option} key={option.userId} />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default InputDropdown;
