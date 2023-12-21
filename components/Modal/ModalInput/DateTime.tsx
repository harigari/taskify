import { Dispatch, SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DateTime.module.css";
import Image from "next/image";
import clsx from "clsx";

interface DateTime {
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
}

function DateTime({ date, setDate }: DateTime) {
  const minDate = new Date();

  const imageStyle = clsx(styles.image, date || styles.imageOpacity);

  return (
    <div className={styles.root}>
      <div>
        <Image className={imageStyle} src="/images/icons/calendar.svg" width={20} height={20} alt="" />
      </div>
      <DatePicker
        className={styles.datepick}
        selected={date}
        onChange={(date) => setDate(date)}
        timeInputLabel="Time:"
        dateFormat="MM/dd/yyyy h:mm aa"
        placeholderText="날짜를 입력해 주세요"
        minDate={minDate}
        showTimeInput
      />
    </div>
  );
}

export default DateTime;
