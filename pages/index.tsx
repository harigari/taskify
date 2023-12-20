import Header from "@/components/header/Header";
import Card from "@/components/Card/Card";
import ChipColors from "@/components/Chips/ChipColors/ChipColors";
import ChipNum from "@/components/Chips/ChipNum/ChipNum";
import ChipPlus from "@/components/Chips/ChipPlus/ChipPlus";
import ChipTag from "@/components/Chips/ChipTag/ChipTag";
import ChipTodo from "@/components/Chips/ChipTodo/ChipTodo";

export default function Home() {
  return (
    <>
      <ChipNum>1</ChipNum>
      <ChipPlus />
      <ChipTodo size="sm">On Progress</ChipTodo>
      {/* <ChipTag name="백엔드" /> */}
      <ChipTag size="sm">차차차</ChipTag>
      <ChipColors size="sm" />
      <Card />
    </>
  );
}
