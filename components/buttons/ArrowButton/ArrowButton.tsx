import Image from "next/image";
import React from "react";
import styles from "./ArrowButton.module.css";
import { clsx } from "clsx";

interface Props {
  disabled?: boolean;
  onClick?: () => void;
  isLeft?: boolean;
}

const ArrowButton = ({ disabled, isLeft = true, onClick }: Props) => {
  const buttonStyle = clsx(styles.button, isLeft || styles.rotate);

  return (
    <button className={clsx(buttonStyle)} onClick={onClick}>
      <div className={styles.icon_wrapper}>
        {/* 이미지 컴포넌트라 :disabled 사용을 못해서 이렇게 했습니당 */}
        <Image
          className={clsx(disabled && styles.disabled)}
          alt={`${isLeft ? "왼쪽" : "오른쪽"} 화살표`}
          fill
          src="/images/icons/arrow.svg"
        />
      </div>
    </button>
  );
};

export default ArrowButton;
