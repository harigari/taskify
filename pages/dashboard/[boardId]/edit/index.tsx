import MenuLayout from "@/components/MenuLayout/MenuLayout";
import React from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getAccessTokenFromCookie } from "@/utils/getAccessToken";
import sender from "@/apis/sender";

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
        <></>
      </MenuLayout>
    </>
  );
};

export default DashboardEdit;
