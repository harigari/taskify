import Image from "next/image";
import { ReactNode } from "react";
import styles from "./HeaderButton.module.css";

interface HeaderButtonProps {
  src: string;
  alt: string;
  children: ReactNode;
}

const HeaderButton = ({ src, alt, children, ...props }: HeaderButtonProps) => {
  return (
    <button className={styles.button} {...props}>
      <Image className={styles.button__image} width={20} height={20} src={src} alt={alt} />
      <span>{children}</span>
    </button>
  );
};

export default HeaderButton;
