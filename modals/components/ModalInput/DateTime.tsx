import clsx from "clsx";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DateTime.module.css";

interface DateTime {
  id: string;
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
}

function DateTime({ date, setDate, id }: DateTime) {
  const minDate = new Date();

  const imageStyle = clsx(styles.image, date || styles.imageOpacity);

  return (
    <div className={styles.root}>
      <div>
        <Image className={imageStyle} src="/icons/calendar.svg" width={20} height={20} alt="" />
      </div>
      <DatePicker
        id={id}
        className={styles.datepick}
        selected={date}
        onChange={(date: Date) => setDate(date)}
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
