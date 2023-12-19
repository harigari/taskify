import Image from "next/image";
import styles from "./BoardButton.module.css";
import { BoardButtonProps } from "@/components/header/header.type";

const BoardButton = ({ src, alt, children, ...props }: BoardButtonProps) => {
  return (
    <button className={styles.button} {...props}>
      <Image className={styles.button__image} width={20} height={20} src={src} alt={alt} />
      <span>{children}</span>
    </button>
  );
};

export default BoardButton;
