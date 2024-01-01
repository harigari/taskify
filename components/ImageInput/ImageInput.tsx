import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./ImageInput.module.css";

interface ImageInputProp {
  setImageFile: Dispatch<SetStateAction<File | null>>;
  imageFile: File | null;
  initialvalue?: string | null;
}

function ImageInput({ setImageFile, imageFile, initialvalue = "" }: ImageInputProp) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(initialvalue);
  const [hover, setHover] = useState(false);

  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseOut = () => {
    setHover(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files !== null) {
      const imageFile = e.target.files[0];
      setImageFile(imageFile);
    }
  };

  useEffect(() => {
    if (!imageFile) return;
    const nextPreview = URL.createObjectURL(imageFile);
    setPreview(nextPreview);

    return () => {
      setPreview("");
      URL.revokeObjectURL(nextPreview);
    };
  }, [imageFile]);

  return (
    <div className={styles.root} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <label htmlFor="imageFile" className={styles.label}>
        <Image className={styles.image} src={preview ? preview : "/icons/icon-add_file.svg"} fill alt="" />
        {hover && preview && (
          <div className={styles.hoverBox}>
            <Image width={30} height={30} src="/icons/icon-edit_input_file.svg" alt="이미지 추가하기" />
          </div>
        )}
      </label>
      <input
        id="imageFile"
        className={styles.input}
        type="file"
        onChange={handleChange}
        accept="image/jpeg, image/png"
        ref={inputRef}
      />
    </div>
  );
}

export default ImageInput;
