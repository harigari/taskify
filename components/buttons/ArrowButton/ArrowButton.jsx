import Image from "next/image";
import React from "react";
import styles from "./ArrowButton.module.css";
import { clsx } from "clsx";
const ArrowButton = ({ onLeftClick, onRightLeftClick, leftDisabled, rightDisabled }) => {
  return (
    <div className={styles.button_container}>
      <button className={clsx(styles.button, styles.left)} onClick={onLeftClick}>
        <div className={styles.icon_wrapper}>
          <Image
            className={leftDisabled && styles.disabled}
            alt="왼쪽 화살표"
            fill
            src="/images/icons/left_arrow.svg"
          />
        </div>
      </button>

      <button className={clsx(styles.button, styles.right)} onClick={onRightLeftClick}>
        <div className={styles.icon_wrapper}>
          <Image
            className={rightDisabled && styles.disabled}
            alt="오른쪽 화살표"
            fill
            src="/images/icons/right_arrow.svg"
          />
        </div>
      </button>
    </div>
  );
};

export default ArrowButton;
