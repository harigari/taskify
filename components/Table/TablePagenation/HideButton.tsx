import { Dispatch, SetStateAction } from "react";
import styles from "./HideButton.module.css";
import Image from "next/image";

interface HideButtonProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const HideButton = ({ isOpen, setIsOpen }: HideButtonProps) => {
  return (
    <button className={styles.hidebutton} onClick={() => setIsOpen((prev) => !prev)}>
      <Image
        width={14}
        height={7}
        src={`/images/icons/icon-arrow${isOpen ? "up" : "down"}.svg`}
        alt={`테이블 숨기기 버튼`}
      />
      {isOpen ? "접어두기" : "펼치기"}
    </button>
  );
};

export default HideButton;
