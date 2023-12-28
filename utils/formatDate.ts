export enum DateFormat {
  Full = "full", // 'yyyy.MM.dd HH:mm'
  DateOnly = "dateOnly", // 'yyyy.MM.dd'
}

const formatDate = (dueDate: string, format: DateFormat): string => {
  const date = new Date(dueDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  if (format === DateFormat.DateOnly) {
    return `${year}.${month}.${day}`;
  } else {
    return `${year}.${month}.${day} ${hour}:${minute}`;
  }
};

export default formatDate;
