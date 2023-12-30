import { MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Card from "@/components/Card/Card";
import MenuLayout from "@/components/menulayout/MenuLayout";
import style from "./dashboard.module.css";
import ChipPlus from "@/components/Chips/ChipPlus/ChipPlus";
import MultiInputModal from "@/modals/MultiInputModal";
import SingleInputModal from "@/modals/SingleInputModal";
import Button from "@/components/Buttons/Button/Button";

const Dashboard = () => {
  const [isCreateCardOpen, setIsCreateCardOpen] = useState(false);
  const [isCreateColumnOpen, setIsCreateColumnOpen] = useState(false);
  const router = useRouter();
  const { boardId } = router.query;
  const dashboardId = Number(boardId);

  const mock = [
    {
      id: 0,
      title: "새로운 일정 관리 Taskify",
      tags: ["가나다dddddddddddd", "백엔드", "프로젝트", "오아아아", "차오아나나", "성공"],
      dueDate: "2023-01-10T15:30:15.000Z",
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
      dueDate: "2023-01-10T15:30:15.000Z",
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
      dueDate: "2023-01-10T15:30:15.000Z",
      assignee: {
        // profileImageUrl: "string",
        nickname: "수지",
        id: 2,
      },
      imageUrl: "/images/photos/card-image3.svg",
    },
  ];

  const handleCreateCard = () => {
    setIsCreateCardOpen(true);
  };

  const handleCreateColumn = () => {
    setIsCreateColumnOpen(true);
  };

  const handleCardModalToggle = (e: MouseEvent) => setIsCreateCardOpen((prevValue) => !prevValue);
  const handleColumnModalToggle = (e: MouseEvent) => setIsCreateColumnOpen((prevValue) => !prevValue);

  return (
    <>
      {/* 대시보드에 맞는 레이아웃으로 설정-헤더 수정 */}
      <MenuLayout>
        {/* 컬럼 아이디 어떻게 처리할 지 고민, dashboardId undefined인 거 처리 */}
        {isCreateCardOpen && (
          <MultiInputModal
            title="할 일 생성"
            buttonText="생성"
            columnId={1}
            dashboardId={dashboardId}
            handleModalClose={handleCardModalToggle}
          />
        )}
        {isCreateColumnOpen && (
          <SingleInputModal
            id=""
            type="text"
            labelName="이름"
            title="새 컬럼 생성"
            buttonText="생성"
            handleModalClose={handleColumnModalToggle}
          />
        )}
        <div className={style.layoutContainer}>
          <div className={style.columnContainer} onClick={() => handleCreateCard()}>
            <Card cardList={mock} columnName="To do" />
            <Card cardList={mock} columnName="On Progress" />
            <Card cardList={mock} columnName="Done" />
          </div>
          <div className={style.buttonWrapper} onClick={() => handleCreateColumn()}>
            <Button buttonType="add_column" color="white">
              <div className={style.buttonContentWrapper}>
                <span>새로운 컬럼 추가하기</span>
                <ChipPlus size="lg"></ChipPlus>
              </div>
            </Button>
          </div>
        </div>
      </MenuLayout>
    </>
  );
};

export default Dashboard;
