import Image from "next/image";
import styles from "./HeaderButton.module.css";
import { HeaderButtonProps } from "@/components/header/header.type";

const HeaderButton = ({ src, alt, children, ...props }: HeaderButtonProps) => {
  return (
    <button className={styles.button} {...props}>
      <Image className={styles.button__image} width={20} height={20} src={src} alt={alt} />
      <span>{children}</span>
    </button>
  );
};

export default HeaderButton;
