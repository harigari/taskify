import sender from "@/apis/sender";
import Button from "@/components/Buttons/Button/Button";
import ChipColors from "@/components/Chips/ChipColors/ChipColors";
import MenuLayout from "@/components/MenuLayout/MenuLayout";
import { getAccessTokenFromCookie } from "@/utils/getAccessToken";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./DashboardEdit.module.css";
import { useState } from "react";
import { ColorType } from "@/types/api.type";
import Link from "next/link";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const accessToken = getAccessTokenFromCookie(context) as string;
  const {
    data: { dashboards },
  } = await sender.get({ path: "dashboards", method: "pagination", accessToken });

  return {
    props: { dashboards },
  };
};
const DashboardEdit = ({ dashboards }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(dashboards);
  const router = useRouter();
  const boardId = router?.query.boardId;
  const dashboardData = dashboards.find((v) => v.id === Number(boardId));
  const [color, setColor] = useState<ColorType>(dashboardData?.color ?? "#7ac555");

  return (
    <>
      <MenuLayout dashboardList={dashboards}>
        <div className={styles.body}>
          <Link href={`/dashboard/${boardId}`} className={styles.back_button}>
            <Image width={20} height={20} alt="왼쪽 화살표 아이콘 " src="/icons/icon-arrowleft.svg" />
            <span>돌아가기</span>
          </Link>

          <div className={styles.name_edit_box}>
            <div className={styles.name_edit_header}>
              <input className={styles.dashboard_name} value={dashboardData?.title} />
              <ChipColors size="lg" selectedColor={color} setSelectedColor={setColor} />
            </div>
            <button className={styles.edit_button}>변경</button>
          </div>

          <Button color="gray" buttonType="dashboard_delete">
            대시보드 삭제하기
          </Button>
        </div>
      </MenuLayout>
    </>
  );
};

export default DashboardEdit;
