import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./ImageInput.module.css";
import clsx from "clsx";

interface ImageInputProp {
  setImageFile: Dispatch<SetStateAction<File | null>>;
  imageFile: File | null;
}

function ImageInput({ setImageFile, imageFile }: ImageInputProp) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>("");
  const [hover, setHover] = useState(false);

  const handleMouseOver = () => {
    console.log("a");
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
      <label htmlFor="file" className={styles.label}>
        <Image className={styles.image} src={preview ? preview : "/images/icons/add_file.svg"} fill alt="" />
        {hover && preview && (
          <div className={styles.hoverBox}>
            <Image width={30} height={30} src="/images/icons/edit_input_file.svg" alt="" />
          </div>
        )}
      </label>
      <input
        id="file"
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
