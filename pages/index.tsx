import Header from "@/components/header/Header";
import Card from "@/components/Card/Card";
import ChipColors from "@/components/Chips/ChipColors/ChipColors";
import ChipNum from "@/components/Chips/ChipNum/ChipNum";
import ChipPlus from "@/components/Chips/ChipPlus/ChipPlus";
import ChipTag from "@/components/Chips/ChipTag/ChipTag";
import ChipTodo from "@/components/Chips/ChipTodo/ChipTodo";
import TagInput from "@/components/Modal/ModalInput/TagInput";
import { useState } from "react";
import InputWrapper from "@/components/Input/InputWrapper";
import Comment from "@/components/Modal/ModalInput/Comment";

export default function Home() {
  const [value, setValue] = useState("");
  const [tagList, setTagList] = useState<string[]>([]);

  const config = { value, setValue, tagList, setTagList, id: "sex" };

  return (
    <>
      <TagInput {...config}></TagInput>
      <InputWrapper label="댓글" htmlFor="comment">
        <Comment value={value} setValue={setValue} id="comment" />
      </InputWrapper>
    </>
  );
}
