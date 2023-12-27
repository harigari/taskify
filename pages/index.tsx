import { TaskInfo } from "@/components/Modals/Modal.type";
import TaskCardModal from "@/components/Modals/TaskCardModal";

import TablePagenation from "@/components/Table/TablePagination/TablePagination";
import ProfileIcon from "@/components/header/members/ProfileIcon";

export default function Home() {
  const cardInfo: TaskInfo = {
    id: 81,
    title: "숙소 예약",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus nibh arcu, quis consequat ante cursus eget. Cras mattis, nulla non laoreet porttitor, diam justo laoreet eros, vel aliquet diam elit at leo.",
    tags: ["재밌겠다", "호호호"],
    dueDate: "2024-12-12 03:12",
    assignee: {
      id: 102,
      nickname: "yudame",
      profileImageUrl: null,
    },
    imageUrl: "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image/1-7_759_1703594466218.png",
    columnId: 759,
    dashboardId: 136,
  };

  return (
    <>
      <TaskCardModal data={cardInfo} />
    </>
  );
}
