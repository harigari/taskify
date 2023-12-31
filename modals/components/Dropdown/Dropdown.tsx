import clsx from "clsx";
import styles from "./Dropdown.module.css";
import { Dispatch, MouseEvent, ReactNode, SetStateAction, useState } from "react";
import Option from "./Option";
import Image from "next/image";
import Label from "@/components/Label/Label";
import ChipTodo from "@/components/Chips/ChipTodo/ChipTodo";

interface DropdownProp {
  children: ReactNode;
  value: string | undefined;
  setValue: Dispatch<SetStateAction<string | undefined>>;
  options: string[] | undefined;
}

const Dropdown = ({ options, value, setValue, children }: DropdownProp) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    setIsOpen((value) => !value);
  };

  const selectedStyle = clsx(styles.selected, isOpen && styles.selectedBorder);

  return (
    <>
      <div className={styles.root}>
        <Label>{children}</Label>
        <div className={styles.container}>
          <div className={selectedStyle} onClick={handleClick}>
            <ChipTodo color="purple" size="lg">
              {value}
            </ChipTodo>
            <Image src="/icons/icon-dropdown.svg" alt="" width={26} height={26} />
          </div>
          {isOpen && (
            <div className={styles.options}>
              {options?.map((option, index) => {
                return <Option value={value} setValue={setValue} setIsOpen={setIsOpen} option={option} key={index} />;
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dropdown;
