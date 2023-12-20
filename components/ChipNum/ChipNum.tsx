import style from "./ChipNum.module.css";
const ChipNum = ({ num }) => {
  return (
    <>
      <div className={`${style.container}`}>
        <div className={`${style.wrapper}`}>{num}</div>
      </div>
    </>
  );
};
export default ChipNum;
