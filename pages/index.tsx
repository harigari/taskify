import Header from "@/components/header/Header";
import Card from "@/components/Card/Card";
import ChipColors from "@/components/Chips/ChipColors/ChipColors";
import ChipNum from "@/components/Chips/ChipNum/ChipNum";
import ChipPlus from "@/components/Chips/ChipPlus/ChipPlus";
import ChipTag from "@/components/Chips/ChipTag/ChipTag";
import ChipTodo from "@/components/Chips/ChipTodo/ChipTodo";

export default function Home() {
  // 지수 테스트 코드
  const mock = [
    {
      id: 0,
      title: "새로운 일정 관리 Taskify",
      tags: ["가나다dddddddddddd", "백엔드", "프로젝트", "오아아아", "차오아나나", "성공"],
      dueDate: "2023.10.31",
      assignee: {
        // profileImageUrl: "string",
        nickname: "지수",
        id: 0,
      },
      imageUrl: null,
    },
    {
      id: 1,
      title: "스프린트 중급 프로젝트",
      tags: ["HTML", "CSS", "JS", "정적 생성", "서버사이드 렌더링"],
      dueDate: "2023.12.25",
      assignee: {
        // profileImageUrl: "string",
        nickname: "Jisoo",
        id: 1,
      },
      imageUrl: "/images/photos/card-image2.svg",
    },
    {
      id: 2,
      title: "졸업 프로젝트",
      tags: ["집갈래dd", "배고파", "졸려", "할 수 있다"],
      dueDate: "2024.01.09",
      assignee: {
        // profileImageUrl: "string",
        nickname: "수지",
        id: 2,
      },
      imageUrl: "/images/photos/card-image3.svg",
    },
  ];
  return (
    <>
      {/* 지수 테스트 코드 */}
      {/* <ChipNum>1</ChipNum>
      <ChipPlus />
      <ChipTodo size="sm">On Progress</ChipTodo>
      <ChipTag size="sm">차차차</ChipTag>
      <ChipColors size="sm" /> */}

      <Card cardList={mock} />
    </>
  );
}
