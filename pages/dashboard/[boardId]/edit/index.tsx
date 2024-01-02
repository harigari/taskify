import MenuLayout from "@/components/MenuLayout/MenuLayout";
import React from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getAccessTokenFromCookie } from "@/utils/getAccessToken";
import sender from "@/apis/sender";
import Button from "@/components/Buttons/Button/Button";
import Image from "next/image";
import styles from "./DashboardEdit.module.css";
import InputWrapper from "@/components/Input/InputWrapper";
import clsx from "clsx";
import ChipColors from "@/components/Chips/ChipColors/ChipColors";

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
  return (
    <>
      <MenuLayout dashboardList={dashboards}>
        <div className={styles.body}>
          <div className={styles.back_button}>
            <Image width={20} height={20} alt="왼쪽 화살표 아이콘 " src="/icons/icon-arrowleft.svg" />
            <button>돌아가기</button>
          </div>

          <form className={styles.name_edit_box}>
            <div className={styles.name_edit_header}>
              <span className={styles.dashboard_name}>비브리지</span>
              <ChipColors size="lg" selectedColor="#7ac555" setSelectedColor={() => {}} />
            </div>
            <button className={styles.edit_button}>변경</button>
          </form>

          <Button color="gray" buttonType="dashboard_delete">
            대시보드 삭제하기
          </Button>
        </div>
      </MenuLayout>
    </>
  );
};

export default DashboardEdit;
