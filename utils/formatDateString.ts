/**
 * @param dateString {string} '2021-08-01T00:00:00.000Z'
 * @param format {Format} 'yyyy.MM.dd HH:mm'과 같은 형식을 사용합니다. (옵션)
 * @description 날짜를 원하는 포맷으로 변환합니다.
 */

type Format = "yyyy.MM.dd HH:mm" | "yyyy.MM.dd" | "yyyy-MM-dd HH:mm";
export default function formatDateString(dateString: string, format: Format = "yyyy.MM.dd HH:mm") {
  const date = new Date(dateString);

  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return format
    .replace("yyyy", year)
    .replace("MM", month)
    .replace("dd", day)
    .replace("HH", hours)
    .replace("mm", minutes);
}
