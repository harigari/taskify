// Dashboard 컴포넌트에서 변경
import { useEffect, useState } from "react";
// import { useInView } from "react-intersection-observer";
import Button from "@/components/buttons/Button/Button";
import Card from "@/components/Card/Card";
import MenuLayout from "@/components/menulayout/MenuLayout";
import style from "./dashboard.module.css";
import ChipPlus from "@/components/Chips/ChipPlus/ChipPlus";
import MultiInputModal from "@/modals/MultiInputModal";

const Dashboard = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  return (
    mounted && (
      <>
        {/* 대시보드에 맞는 레이아웃으로 설정 */}
        <MenuLayout>
          {isCreateModalOpen && (
            <MultiInputModal
              title="할 일 생성"
              buttonText="생성"
              columnId={1}
              dashboardId={2}
              handleModalClose={handleModalClose}
            />
          )}
          <div className={style.layoutContainer}>
            <div className={style.columnContainer}>
              <Card cardList={mock} columnName="To do" onClick={() => handleCreateModal()} />
              <Card cardList={mock} columnName="On Progress" />
              <Card cardList={mock} columnName="Done" />
            </div>
            <div className={style.buttonWrapper}>
              <Button buttonType="add_column" color="white">
                <div className={style.buttonContentWrapper}>
                  <span>새로운 컬럼 추가하기</span>
                  <button>
                    <ChipPlus size="lg"></ChipPlus>
                  </button>
                </div>
              </Button>
            </div>
          </div>
        </MenuLayout>
      </>
    )
  );
};

export default Dashboard;
