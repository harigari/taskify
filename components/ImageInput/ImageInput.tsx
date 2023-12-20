import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./ImageInput.module.css";

interface ImageInputProp {
  setImageFile: Dispatch<SetStateAction<File | null>>;
  imageFile: File | null;
}

function ImageInput({ setImageFile, imageFile }: ImageInputProp) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files !== null) {
      const imageFile = e.target.files[0];
      setImageFile(imageFile);
    }
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current; // useRef로 노드를 잡아오기
    if (!inputNode) return; // 잡아온 노드가 없으면 함수 바로 종료
    inputNode.value = ""; // 인풋 value를 초기화
    setImageFile(null); // fileValue state도 초기화
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
    <div>
      <label htmlFor="file" className={styles.label}>
        <Image className={styles.image} src={preview ? preview : "/images/add_file.svg"} fill alt="" />
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
