import clsx from "clsx";
import styles from "@/components/Modal/Dropdown/Dropdown.module.css";
import {
  ChangeEvent,
  Dispatch,
  FocusEvent,
  KeyboardEvent,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Option from "./Option";
import Label from "@/components/Label/Label";
import Image from "next/image";
import ProfileIcon from "@/components/Members/ProfileIcon";
import { Member } from "@/types/Header.type";

interface DropdownProp {
  children: ReactNode;
  value: Member | undefined;
  setValue: Dispatch<SetStateAction<Member | undefined>>;
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

  const selectedStyle = clsx(styles.selected, (isOpen || inputValue) && styles.selectedBorder);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = (e: FocusEvent) => {
    e.preventDefault();

    inputRef.current?.focus();
    if (!inputValue) {
      setIsOpen((prevValue) => !prevValue);
    }
  };

  const handleBlur = (e: FocusEvent) => {
    e.preventDefault();

    inputRef.current?.blur();
    if (!inputValue) {
      setIsOpen((prevValue) => !prevValue);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && filtedOptions.length > 0) {
      setValue(filtedOptions[0]);
      setInputValue("");
      setIsOpen((prevValue) => !prevValue);
    }
  };

  const handleDeleteClick = () => {
    setValue(undefined);
  };

  useEffect(() => {
    const filtedOptions = optionFilter(options, inputValue);
    setFiltedOptions(filtedOptions);
  }, [inputValue, options]);

  return (
    <div className={styles.root}>
      <Label>{children}</Label>
      <div className={styles.container}>
        <div className={selectedStyle} onFocus={handleFocus} onBlur={handleBlur}>
          {!value ? (
            <input
              ref={inputRef}
              className={styles.input}
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleEnter}
              placeholder="담당자를 검색해라 애송이"
            ></input>
          ) : (
            <div className={styles.selectedNickname}>
              {/* ProfileIcon에 marginLeft -1rem이 달려있어서, 부득이 인라인 스타일로 이 부분을 조절함 */}
              <div className={styles.profileWrapper} style={{ marginLeft: "1rem" }}>
                <ProfileIcon size="sm" member={value} />
                {value.nickname}
              </div>
              <button type="button" className={styles.button} onMouseDown={handleDeleteClick}>
                <Image src="/icons/close.svg" alt="닫기 버튼" width={20} height={20} />
              </button>
            </div>
          )}
        </div>

        {(isOpen || inputValue) && (
          <div className={styles.options}>
            {filtedOptions?.map((option) => {
              return (
                <Option value={value} setValue={setValue} setIsOpen={setIsOpen} option={option} key={option.userId} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputDropdown;
