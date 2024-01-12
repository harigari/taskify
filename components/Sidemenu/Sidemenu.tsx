import sender from "@/apis/sender";
import ChipColors from "@/components/Chips/ChipColors/ChipColors";
import Input from "@/components/Input/Input";
import InputWrapper from "@/components/Input/InputWrapper";
import useInfScroll from "@/hooks/useInfScroll";
import useInputController from "@/hooks/useInputController";
import stylesFromSingle from "@/modals/Modal.module.css";
import ModalWrapper from "@/modals/ModalWrapper";
import ModalButton from "@/modals/components/ModalButton/ModalButton";
import { ColorType, Req_post_dashboard } from "@/types/api.type";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import styles from "./Sidemenu.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { accessTokenAtom } from "@/atoms/atoms";

const Sidemenu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ColorType>("#7ac555");

  const column = useInputController({
    inputConfig: {
      id: "newDashboard",
      type: "text",
    },
    labelConfig: { labelName: "대시보드 이름" },
  });

  const accessToken = useAtomValue(accessTokenAtom);

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

  const dashboardList = dashboards?.data?.data.dashboards ?? [];

  const handleModalToggle = () => {
    setIsOpen((prevValue) => !prevValue);
  };

  const queryClient = useQueryClient();

  const dashboardMutation = useMutation({
    mutationFn: (data: Req_post_dashboard) => sender.post({ path: "dashboard", accessToken, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboards"] });
      handleModalToggle();
      column.input.setValue("");
      setSelectedColor("#7ac555");
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      title: column.input.value,
      color: selectedColor,
    };

    dashboardMutation.mutate(data);
  };

  return (
    <aside className={styles.container}>
      <Link href="/mydashboard" className={styles.logo}>
        <picture>
          <source media="(max-width:767px)" srcSet="/images/logo-purple.svg" />
          <Image
            priority
            width={110}
            height={35}
            src="/images/logo-purple-horizontal.png"
            alt="나의 대시보드로 돌아가기"
          />
        </picture>
      </Link>
      <div className={styles.title}>
        <Link className={styles.title__link} href="/mydashboard">
          <p className={styles.title__text}>Dash Boards</p>
        </Link>
        <button className={styles.title__button} onClick={handleModalToggle}>
          <Image width={20} height={20} src="/icons/icon-addbox.svg" alt="대시보드 추가하기" />
        </button>
      </div>
      <ul className={styles.list}>
        {dashboardList?.map((board, i) => (
          <li key={i}>
            <Link
              href={`/dashboard/${board.id}`}
              className={clsx(styles.item__button, { [styles.selected]: board.id === Number(router.query.boardId) })}
            >
              <div className={styles.item__icon} style={{ backgroundColor: board.color }} />
              <p className={styles.item__text}>{board.title}</p>
              {board.createdByMe && (
                <Image
                  className={styles.item__img}
                  width={18}
                  height={14}
                  src="/icons/icon-crown.svg"
                  alt="내가 생성한 대시보드"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>

      {isOpen && (
        <ModalWrapper handleModalClose={handleModalToggle} size="md">
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
    </aside>
  );
};

export default Sidemenu;
