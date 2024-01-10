import sender from "@/apis/sender";
import Button from "@/components/Buttons/Button/Button";
import ChipColors from "@/components/Chips/ChipColors/ChipColors";
import Input from "@/components/Input/Input";
import InputWrapper from "@/components/Input/InputWrapper";
import TablePagination from "@/components/Table/TablePagination/TablePagination";
import useApi from "@/hooks/useApi";
import useInputController from "@/hooks/useInputController";
import AlertModal from "@/modals/AlertModal";
import { ColorType, InvitationData, Member } from "@/types/api.type";
import { getAccessTokenFromCookie } from "@/utils/getAccessToken";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import styles from "./DashboardEdit.module.css";
import MenuLayout from "@/components/MenuLayout/MenuLayout";
import Head from "next/head";
import { dehydrate, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clientProvider } from "@/apis/clientProvider";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const accessToken = getAccessTokenFromCookie(context) as string;

  if (!accessToken) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  const queryClient = await clientProvider(context);

  return {
    props: { accessToken, dehydratedState: dehydrate(queryClient) },
  };
};

const DashboardEdit = ({ accessToken }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dashboards = useQuery({
    queryKey: ["dashboards"],
    queryFn: () =>
      sender.get({
        path: "dashboards",
        method: "pagination",
        size: 999,
        accessToken,
      }),
  });

  const queryClient = useQueryClient();

  const dashboardsMutation = useMutation({
    mutationFn: () =>
      putData({
        path: "dashboard",
        id: Number(boardId),
        data: { title: input.value, color },
        accessToken,
      }),
    onSuccess: (data) => {
      setColor(color);
      setPrevColor(color);
      input.setValue("");
      setBoardName(data?.data.title);
      router.push(`/dashboard/${boardId}/edit`);
      queryClient.invalidateQueries({ queryKey: ["dashboards"] });
    },
  });

  const dashboardList = dashboards?.data?.data.dashboards ?? [];

  const router = useRouter();
  const boardId = router?.query.boardId;

  const dashboard = dashboardList.find((item) => {
    return item.id === Number(boardId);
  });

  const dashboardData = dashboardList.find((v) => v.id === Number(boardId));

  const [prevColor, setPrevColor] = useState(dashboardData?.color ?? "#760dde");

  const [color, setColor] = useState<ColorType>(prevColor);

  const [boardName, setBoardName] = useState(dashboard?.title);

  const [isOpenDashboardDeleteModal, setIsOpenDashboardDeleteModal] = useState(false);
  const { pending, wrappedFunction } = useApi("delete");

  const handleDashboardDeleteModalToggle = () => {
    setIsOpenDashboardDeleteModal((prev) => !prev);
  };

  const handleDashboardDeleteSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
    dashboardsMutation.mutate();
  };

  return (
    <>
      <Head>
        <title>Taskify - 대시보드 수정</title>
      </Head>

      <MenuLayout>
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

          <TablePagination
            row={4}
            // data={memberList}
            // setData={setMemberList}
            title="구성원"
            tableIndex={{ 이름: "nickname", "": "deleteButton" }}
          />

          {/* 초대 내역 */}

          <TablePagination
            row={4}
            // data={invitationList}
            // setData={setInvitationList}
            invite
            title="초대 내역"
            tableIndex={{ 이메일: "email", "": "cancelButton" }}
          />

          <Button
            disabled={pending}
            onClick={handleDashboardDeleteModalToggle}
            color="gray"
            buttonType="dashboard_delete"
          >
            대시보드 삭제하기
          </Button>

          {isOpenDashboardDeleteModal && (
            <AlertModal
              alertText="대시보드를 삭제하시겠습니까?"
              handleSubmit={handleDashboardDeleteSubmit}
              handleModalClose={handleDashboardDeleteModalToggle}
            />
          )}
        </div>
      </MenuLayout>
    </>
  );
};

export default DashboardEdit;
