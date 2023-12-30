import { useRouter } from "next/router";
import MenuLayout from "@/components/menulayout/MenuLayout";
import style from "./dashboard.module.css";
import ChipPlus from "@/components/Chips/ChipPlus/ChipPlus";
import Button from "@/components/Buttons/Button/Button";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import sender from "@/apis/sender";
import { getAccessTokenFromCookie } from "@/utils/getAccessToken";
import Column from "@/components/Column/Column";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const accessToken = getAccessTokenFromCookie(context) as string;

  const boardId = context.query["boardId"];
  const {
    data: { data: columnData },
  } = await sender.get({ path: "columns", id: Number(boardId), accessToken });

  const cardListData = await Promise.all(
    (columnData || []).map(async ({ id }) => {
      const {
        data: { cards },
      } = await sender.get({ path: "cards", id: id, accessToken });

      return cards;
    })
  );

  const {
    data: { members: assigneeList },
  } = await sender.get({ path: "members", id: Number(boardId), accessToken });

  return {
    props: { accessToken, columnData, cardListData, assigneeList },
  };
};

const Dashboard = ({
  columnData,
  cardListData,
  assigneeList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      {/* 대시보드에 맞는 레이아웃으로 설정-헤더 수정 */}
      <MenuLayout>
        <div className={style.layoutContainer}>
          <div className={style.columnContainer}>
            {columnData.map((column, index) => {
              return (
                <Column
                  columnId={column.id}
                  assigneeList={assigneeList}
                  title={column.title}
                  dashboardId={column.dashboardId}
                  key={column.id}
                  cardList={cardListData[index]}
                />
              );
            })}
          </div>
          <div className={style.buttonWrapper}>
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
