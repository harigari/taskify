import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "@/modals/components/Dropdown/Option.module.css";
import Image from "next/image";
import ProfileIcon from "@/components/Members/ProfileIcon";
import { BasicUserType } from "@/types/api.type";

interface OptionProp {
  value: any;
  setValue: Dispatch<SetStateAction<any>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  option: BasicUserType;
}

function Option({ value, setValue, setIsOpen, option }: OptionProp) {
  const [hover, setHover] = useState(false);

  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseOut = () => {
    setHover(false);
  };

  const imageStyle = clsx(
    hover ? styles.MouseOverImage : styles.MouseOutImage,
    value?.id === option.id && styles.selectedImage
  );

  return (
    <div
      className={`${styles.root} option`}
      onMouseDown={() => {
        setValue(option);
        setIsOpen((value) => !value);
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Image className={imageStyle} src="/icons/icon-check-gray.svg" width={22} height={22} alt="" />
      {/* ProfileIcon에 marginLeft -1rem이 달려있어서, 부득이 인라인 스타일로 이 부분을 조절함 */}
      <div className={styles.profileWrapper} style={{ marginLeft: "1rem" }}>
        <ProfileIcon size="sm" member={option} />
        {option.nickname}
      </div>
    </div>
  );
}

export default Option;
