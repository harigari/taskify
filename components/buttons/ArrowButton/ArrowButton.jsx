import Image from "next/image";
import React from "react";
import styles from "./ArrowButton.module.css";
import { clsx } from "clsx";
const ArrowButton = ({ handleRightClick, handleLeftClick, leftDisabled, rightDisabled }) => {
  return (
    <div className={styles.button_container}>
      <button className={clsx(styles.button, styles.left)} onClick={handleLeftClick}>
        <div className={styles.icon_wrapper}>
          <Image className={leftDisabled && styles.disabled} alt="왼쪽 화살표" fill src="/ArrowButton/leftArrow.svg" />
        </div>
      </button>

      <button className={clsx(styles.button, styles.right)} onClick={handleRightClick}>
        <div className={styles.icon_wrapper}>
          <Image className={rightDisabled && styles.disabled} fill src="/ArrowButton/rightArrow.svg" />
        </div>
      </button>
    </div>
  );
};

export default ArrowButton;
