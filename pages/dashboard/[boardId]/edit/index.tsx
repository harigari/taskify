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
import useApi from "@/hooks/useApi";
import InputWrapper from "@/components/Input/InputWrapper";
import useInputController from "@/hooks/useInputController";
import Input from "@/components/Input/Input";
import TablePagination from "@/components/Table/TablePagination/TablePagination";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const accessToken = getAccessTokenFromCookie(context) as string;

  const {
    data: { dashboards },
  } = await sender.get({ path: "dashboards", method: "pagination", accessToken });

  const boardId = context.params?.boardId;

  const {
    data: { members },
  } = await sender.get({ path: "members", id: Number(boardId), accessToken });

  //여기에 있는 초대내역 id를 가지고 삭제를 해야함

  const {
    data: { invitations },
  } = await sender.get({ path: "dashboardInvitations", id: Number(boardId), accessToken });

  if (!accessToken) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  return {
    props: { dashboards, accessToken, members, invitations },
  };
};

const DashboardEdit = ({
  dashboards,
  members,
  accessToken,
  invitations,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const boardId = router?.query.boardId;
  const dashboardData = dashboards.find((v) => v.id === Number(boardId));
  const [prevColor, setPrevColor] = useState(dashboardData?.color ?? "#760dde");
  const [color, setColor] = useState<ColorType>(prevColor);

  const [boardName, setBoardName] = useState(dashboardData?.title);
  const { pending, wrappedFunction } = useApi("delete");

  const handleDashboardDeleteClick = async () => {
    const deleteRes = await wrappedFunction({ path: "dashboard", id: Number(boardId), accessToken });

    if (deleteRes?.status === 204) {
      router.push(`/mydashboard`);
    }
  };

  const { wrapper, input } = useInputController({
    inputConfig: { id: "dashboardName" },
    labelConfig: { labelName: "대시보드 이름" },
  });

  const { wrappedFunction: putData } = useApi("put");

  const handleDashboardEditClick = async () => {
    const res = await putData({
      path: "dashboard",
      id: Number(boardId),
      data: { title: input.value, color },
      accessToken,
    });

    if (res?.status === 200) {
      setColor(color);
      setPrevColor(color);
      input.setValue("");
      setBoardName(res.data.title);
    }
  };

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
              <span className={styles.dashboard_name}>{boardName}</span>
              <ChipColors size="lg" selectedColor={color} setSelectedColor={setColor} />
            </div>

            <InputWrapper {...wrapper}>
              <Input {...input} />
            </InputWrapper>
            <div className={styles.button_box}>
              <button
                onClick={handleDashboardEditClick}
                disabled={!input.value && prevColor === color}
                className={styles.edit_button}
              >
                변경
              </button>
            </div>
          </div>

          {/* 구성원 */}
          <TablePagination data={members} title="구성원" tableIndex={{ 이름: "nickname", "": "deleteButton" }} />

          {/* 초대 내역 */}

          <TablePagination
            data={invitations}
            invite
            title="초대 내역"
            tableIndex={{ 이메일: "email", "": "cancelButton" }}
          />
          <Button disabled={pending} onClick={handleDashboardDeleteClick} color="gray" buttonType="dashboard_delete">
            대시보드 삭제하기
          </Button>
        </div>
      </MenuLayout>
    </>
  );
};

export default DashboardEdit;
