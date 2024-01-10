import sender from "@/apis/sender";
import Button from "@/components/Buttons/Button/Button";
import ChipColors from "@/components/Chips/ChipColors/ChipColors";
import Input from "@/components/Input/Input";
import InputWrapper from "@/components/Input/InputWrapper";
import MenuLayout from "@/components/MenuLayout/MenuLayout";
import TableScroll from "@/components/Table/TableScroll/TableScroll";
import useApi from "@/hooks/useApi";
import useInputController from "@/hooks/useInputController";
import stylesFromSingle from "@/modals/Modal.module.css";
import ModalWrapper from "@/modals/ModalWrapper";
import ModalButton from "@/modals/components/ModalButton/ModalButton";
import { ColorType, Req_post_dashboard } from "@/types/api.type";
import { getAccessTokenFromCookie } from "@/utils/getAccessToken";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import styles from "./index.module.css";
import { useAtomValue } from "jotai";
import { accessTokenAtom } from "@/atoms/atoms";
import Head from "next/head";
import { dehydrate, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { clientProvider } from "@/apis/clientProvider";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const accessToken = getAccessTokenFromCookie(context) as string;

  const queryClient = await clientProvider(context);

  if (!accessToken) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

// 엑세스토큰
export default function Mydashboard({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const accessToken = useAtomValue(accessTokenAtom);

  const router = useRouter();

  const dashboards = useQuery({
    queryKey: ["dashboards"],
    queryFn: () => sender.get({ path: "dashboards", method: "pagination", size: 999, accessToken }),
  });

  const dashboardList = dashboards?.data?.data.dashboards ?? [];

  const queryClient = useQueryClient();

  const dashboardsMutation = useMutation({
    mutationFn: (data: Req_post_dashboard) => sender.post({ path: "dashboard", accessToken, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboards"] });

      handleModalToggle();
      column.input.setValue("");
      setSelectedColor("#7ac555");
    },
  });

  const handleModalToggle = () => {
    setIsOpen((prevValue) => !prevValue);
  };

  const column = useInputController({
    inputConfig: {
      id: "newDashboard",
      type: "text",
    },
    labelConfig: { labelName: "대시보드 이름" },
  });

  const [selectedColor, setSelectedColor] = useState<ColorType>("#7ac555");

  const { pending, wrappedFunction: postData } = useApi("post");

  const handleMakeDashboard = async (e: FormEvent) => {
    e.preventDefault();

    if (pending) return;

    const data = {
      title: column.input.value,
      color: selectedColor,
    };

    dashboardsMutation.mutate(data);
  };

  return (
    <>
      <Head>
        <title>Taskify - 나의 대시보드</title>
      </Head>
      <MenuLayout>
        <main>
          <section className={styles.container}>
            <article className={styles.dashboard}>
              <Button buttonType="dashboard" color="white" onClick={handleModalToggle}>
                <span>새로운 대시보드</span>
                <Image width={22} height={22} src="/icons/icon-addbox-purple.png" alt="대시보드 추가하기" />
              </Button>
              {dashboardList.map((dashboard, i) => (
                <Button key={i} buttonType="dashboard" color="white">
                  <Link href={`/dashboard/${dashboard.id}`}>
                    <div className={styles.dashboard__title}>
                      <div className={styles.dashboard__icon} style={{ backgroundColor: dashboard.color }} />
                      <span>
                        {dashboard.title.length > 10 ? dashboard.title.slice(0, 10) + "..." : dashboard.title}
                      </span>
                    </div>
                    <Image
                      width={18}
                      height={18}
                      src="/icons/icon-arrowright.svg"
                      alt={`${dashboard.title} 대시보드로 바로가기`}
                    />
                  </Link>
                </Button>
              ))}
            </article>

            <TableScroll
              title="초대받은 대시보드"
              type="invitations"
              tableIndex={{ 대시보드: "dashboard", "수락 여부": "acceptButton" }}
              search
            />
          </section>
        </main>
      </MenuLayout>
      {isOpen && (
        <ModalWrapper size="md" handleModalClose={handleModalToggle}>
          <form className={stylesFromSingle.form} onSubmit={handleMakeDashboard} noValidate>
            <div className={stylesFromSingle.modal}>
              <div className={stylesFromSingle.modalTitle}>새로운 대시보드</div>

              <InputWrapper {...column.wrapper}>
                <Input {...column.input} />
              </InputWrapper>
            </div>
            <ChipColors selectedColor={selectedColor} setSelectedColor={setSelectedColor} size="lg" />
            <div className={stylesFromSingle.buttonContainer}>
              <ModalButton.DoubleButton disabled={pending || !column.input.value} onClick={handleModalToggle}>
                생성
              </ModalButton.DoubleButton>
            </div>
          </form>
        </ModalWrapper>
      )}
    </>
  );
}
