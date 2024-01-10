import sender from "@/apis/sender";
import Button from "@/components/Buttons/Button/Button";
import ProfileIcon from "@/components/Members/ProfileIcon";
import useApi from "@/hooks/useApi";
import { InvitationData, Member } from "@/types/api.type";
import { getAccessTokenFromDocument } from "@/utils/getAccessToken";
import makeColorProfile from "@/utils/makeColorProfile";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState, FormEvent, RefObject, Fragment } from "react";
import styles from "./TableList.module.css";
import Image from "next/image";
import clsx from "clsx";
import { useAtom } from "jotai";
import { dashboardListAtom } from "@/atoms/atoms";
import DeleteButton from "@/components/Table/TablePagination/DeleteButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { accessTokenAtom } from "@/atoms/atoms";

type TableIndexType = {
  [a: string]: "nickname" | "dashboard" | "inviter" | "email" | "deleteButton" | "acceptButton" | "cancelButton";
};

interface TableListProps {
  data: (Member | InvitationData)[];
  tableIndex: TableIndexType;
  myRef?: RefObject<HTMLParagraphElement>;
}

const TableList = ({ data, tableIndex, myRef }: TableListProps) => {
  const column = Object.keys(tableIndex).length;
  const isAccept = Object.values(tableIndex).includes("acceptButton");
  const router = useRouter();

  const boardId = Number(router.query.boardId);

  const [isMemberDeleteModalOpen, setIsMemberDeleteModalOpen] = useState(false);

  const dashboardMutation = useMutation({
    mutationFn: () => sender.get({ path: "dashboard", id: boardId, accessToken }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["dashboard", boardId] }),
  });

  const accessToken = useAtomValue(accessTokenAtom);

  const queryClient = useQueryClient();

  const invitationMutation = useMutation({
    mutationFn: (data: InvitationData) =>
      sender.delete({
        path: "dashboardInvitations",
        dashboardId: boardId,
        invitationId: data.id,
        accessToken,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["dashboardInvitations", boardId] }),
  });

  return (
    <ul className={clsx(styles.list, { [styles.list__mobile]: isAccept })}>
      {data.map((data, idx) => {
        const arr = [];
        for (const key of Object.keys(tableIndex)) {
          const v = tableIndex[key];
          switch (true) {
            case v === "nickname":
              if (!(v in data)) continue;
              arr.push(
                <div className={styles.row__item} key={data.userId}>
                  <ProfileIcon member={data} tabIndex={-1} />
                  <p className={styles.row__item}>{data[v]}</p>
                </div>
              );
              continue;
            case v === "dashboard":
              if (!(v in data)) continue;
              arr.push(
                <div className={styles.row__item} key={data.dashboard.id}>
                  {isAccept && <span className={styles.row__text__mobile}>{key}</span>}
                  <div className={styles.row__icon} style={{ backgroundColor: makeColorProfile(data[v].title) }} />
                  <p>{data[v].title}</p>
                </div>
              );
              continue;
            case v === "inviter":
              if (!(v in data)) continue;
              arr.push(
                <p className={styles.row__item} key={data.inviter.id}>
                  {isAccept && <span className={styles.row__text__mobile}>{key}</span>}
                  {data[v].nickname}
                </p>
              );
              continue;
            case v === "email":
              if ("inviter" in data) {
                arr.push(
                  <div className={styles.row__item} key={data.invitee.id}>
                    <p className={styles.row__item}>{data.invitee[v]}</p>
                  </div>
                );
              }
              continue;
            case v === "acceptButton":
              {
                if (!("dashboard" in data)) return;
                const handleReject = (yesOrNo: boolean) => async () => {
                  const accessToken = getAccessTokenFromDocument("accessToken");
                  const res = await sender.put({
                    path: "invitation",
                    id: data.id,
                    data: { inviteAccepted: yesOrNo },
                    accessToken,
                  });

                  if (res.status === 200 && res.data.inviteAccepted === true) {
                    dashboardMutation.mutate();
                  }
                };

                arr.push(
                  <div className={styles.acceptbutton__wrapper} key={data.id}>
                    <Button onClick={handleReject(true)} buttonType="accept_reject" color="violet">
                      수락
                    </Button>
                    <Button onClick={handleReject(false)} buttonType="accept_reject" color="white">
                      거절
                    </Button>
                  </div>
                );
              }
              continue;
            case v === "deleteButton":
              {
                if (!("nickname" in data)) return; // 구성원 삭제하기
                arr.push(
                  <Fragment key={data.id}>
                    <DeleteButton data={data} />
                  </Fragment>
                );
              }
              continue;
            case v === "cancelButton":
              {
                // 보낸 초대 요청 취소하기
                const handleInviteCancel = async (e: FormEvent) => {
                  e.preventDefault();
                  if ("invitee" in data) {
                    await invitationMutation.mutate(data);
                  }
                };

                arr.push(
                  <Button onClick={handleInviteCancel} buttonType="delete" color="white" key={v}>
                    취소
                  </Button>
                );
              }
              continue;
            default:
              arr.push(null);
          }
        }

        return (
          <li
            className={styles.row}
            style={{
              gridTemplateColumns: `repeat(${column - 1}, minmax(max-content, 1fr)) minmax(1rem, 8rem)`,
            }}
            key={idx}
          >
            {arr}
          </li>
        );
      })}
      {data.length === 0 ? (
        <div className={styles.empty}>
          <Image
            width={100}
            height={100}
            priority
            src="/icons/icon-noinvite-dashboard.svg"
            alt="초대 내역이 없습니다."
          />
          <p>초대 내역이 없습니다.</p>
        </div>
      ) : null}
      <p ref={myRef}></p>
    </ul>
  );
};

export default TableList;
