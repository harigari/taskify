// import { TaskInfo } from "@/components/Modals/Modal.type";
// import TaskCardModal from "@/components/Modals/TaskCardModal";

import TablePagenation from "@/components/Table/TablePagination/TablePagination";

export default function Home() {
  const INVITE = [
    {
      id: 1,
      dashboard: {
        title: "나의 대시보드",
        id: 1,
      },
      invitee: {
        nickname: "유다미",
        email: "youdame@codeit.kr",
        id: 22,
      },
      inviteAccepted: true,
    },
    {
      id: 2,
      dashboard: {
        title: "리액트 탐험",
        id: 15,
      },
      invitee: {
        nickname: "김하늘",
        email: "haneulkim@codeit.kr",
        id: 82,
      },
      inviteAccepted: true,
    },
    {
      id: 3,
      dashboard: {
        title: "제 생각에는요",
        id: 14,
      },
      invitee: {
        nickname: "정진호",
        email: "jjh@codeit.kr",
        id: 56,
      },
      inviteAccepted: true,
    },
    {
      id: 4,
      dashboard: {
        title: "좋은것같아요",
        id: 3,
      },
      invitee: {
        nickname: "안지수",
        email: "ahn@codeit.kr",
        id: 34,
      },
      inviteAccepted: true,
    },
  ];
  return (
    <TablePagenation title="초대 내역" data={INVITE} row={3} tableIndex={{ 이메일: "email", "": "button" }} invite />
  );
}
//   const cardInfo: TaskInfo = {
//     id: 81,
//     title: "숙소 예약",
//     description: "게스트하우스 vs 호텔",
//     tags: ["재밌겠다", "호호호"],
//     dueDate: "2024-12-12 03:12",
//     assignee: {
//       id: 102,
//       nickname: "yudame",
//       profileImageUrl: null,
//     },
//     imageUrl: "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image/1-7_759_1703594466218.png",
//   };

//   return (
//     <>
//       <TaskCardModal data={cardInfo} />
//     </>
//   );
// }
