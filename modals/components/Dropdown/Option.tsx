import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "./Option.module.css";
import Image from "next/image";
import ChipTodo from "@/components/Chips/ChipTodo/ChipTodo";

interface OptionProp {
  value: string | undefined;
  setValue: Dispatch<SetStateAction<string | undefined>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  option: string;
}

function Option({ value, setValue, setIsOpen, option }: OptionProp) {
  const [hover, setHover] = useState(false);

  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseOut = () => {
    setHover(false);
  };

  const imageStyle = clsx(
    hover ? styles.MouseOverImage : styles.MouseOutImage,
    value === option && styles.selectedImage
  );

  return (
    <div
      className={styles.root}
      onClick={() => {
        setValue(option);
        setIsOpen((value) => !value);
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Image className={imageStyle} src="/icons/icon-check.svg" width={22} height={22} alt="" />

      <div>
        <ChipTodo color="purple" size="lg">
          {option}
        </ChipTodo>{" "}
      </div>
    </div>
  );
}

export default Option;
