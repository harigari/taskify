import Image from "next/image";
import { MouseEvent, ReactNode } from "react";
import styles from "./HeaderButton.module.css";

interface HeaderButtonProps {
  src: string;
  alt: string;
  children: ReactNode;
  onClick?: (e: MouseEvent) => void;
}

const HeaderButton = ({ src, alt, children, onClick, ...props }: HeaderButtonProps) => {
  return (
    <button onClick={onClick} className={styles.button} {...props}>
      <Image className={styles.button__image} width={20} height={20} src={src} alt={alt} />
      <span>{children}</span>
    </button>
  );
};

export default HeaderButton;
