import Button from "@/components/Buttons/Button/Button";
import TablePagenation from "@/components/Table/TablePagination/TablePagination";
import Image from "next/image";
import styles from "./index.module.css";
import stylesFromSingle from "@/modals/Modal.module.css";
import MenuLayout from "@/components/Menulayout/MenuLayout";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { FormEvent, useState } from "react";
import useInputController from "@/hooks/useInputController";
import ModalWrapper from "@/modals/ModalWrapper";
import InputWrapper from "@/components/Input/InputWrapper";
import Input from "@/components/Input/Input";
import ChipColors from "@/components/Chips/ChipColors/ChipColors";
import ModalButton from "@/modals/components/ModalButton/ModalButton";
import sender from "@/apis/sender";
import { ColorType, DashBoardData } from "@/types/api.type";
import Link from "next/link";
import { getAccessTokenFromCookie } from "@/utils/getAccessToken";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const accessToken = getAccessTokenFromCookie(context) as string;

  const res = await sender.get({ path: "dashboards", method: "pagination", accessToken: accessToken });

  const { dashboards } = res.data;

  return {
    props: { accessToken, dashboards },
  };
};

export default function Mydashboard({
  accessToken,
  dashboards,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [dashboardList, setDashboardList] = useState<DashBoardData[]>(dashboards);
  const [isOpen, setIsOpen] = useState(false);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      title: column.input.value,
      color: selectedColor,
    };

    const res = await sender.post({ path: "dashboard", accessToken, data });

    if (res?.status === 201) {
      handleModalToggle();
      setDashboardList((prevValue) => [res.data, ...prevValue]);
      column.input.setValue("");
      setSelectedColor("#7ac555");
    }
  };

  return (
    <>
      <MenuLayout>
        <main>
          <section className={styles.container}>
            <article className={styles.dashboard}>
              <Button buttonType="dashboard" color="white" onClick={handleModalToggle}>
                <span>새로운 대시보드</span>
                <Image width={22} height={22} src="/icons/icon-addbox-purple.png" alt="대시보드 추가하기" />
              </Button>
              {dashboardList.map((dashboard: any) => (
                <Button key={dashboard.id} buttonType="dashboard" color="white">
                  <Link href={`/dashboard/${dashboard.id}`}>
                    <div className={styles.dashboard__title}>
                      <div className={styles.dashboard__icon} style={{ backgroundColor: dashboard.color }} />
                      <span>{dashboard.title}</span>
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
            <TablePagenation
              title="초대받은 대시보드"
              row={3}
              data={[]}
              tableIndex={{ 이름: "dashboard", 초대자: "inviter", "수락 여부": "deleteButton" }}
              search
            />
          </section>
        </main>
      </MenuLayout>
      {isOpen && (
        <ModalWrapper size="md">
          <form className={stylesFromSingle.form} onSubmit={handleSubmit} noValidate>
            <div className={stylesFromSingle.modal}>
              <div className={stylesFromSingle.modalTitle}>새로운 대시보드</div>

              <InputWrapper {...column.wrapper}>
                <Input {...column.input} />
              </InputWrapper>
            </div>
            <ChipColors selectedColor={selectedColor} setSelectedColor={setSelectedColor} size="lg" />
            <div className={stylesFromSingle.buttonContainer}>
              <ModalButton.DoubleButton onClick={handleModalToggle}>생성</ModalButton.DoubleButton>
            </div>
          </form>
        </ModalWrapper>
      )}
    </>
  );
}