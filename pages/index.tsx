import ChipColors from "@/components/ChipColors/ChipColors";
import ChipNum from "@/components/ChipNum/ChipNum";
import ChipPlus from "@/components/ChipPlus/ChipPlus";
import ChipTag from "@/components/ChipTag/ChipTag";
import ChipTodo from "@/components/ChipTodo/ChipTodo";

export default function Home() {
  return (
    <>
      <ChipNum num="1" />
      <ChipPlus />
      <ChipTodo name="On Progress" size="large" />
      {/* <ChipTag name="백엔드" /> */}
      <ChipTag name="백엔드" />
      <ChipColors />
    </>
  );
}
