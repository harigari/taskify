import Button from "@/components/Buttons/Button/Button";
import ProfileIcon from "@/components/Members/ProfileIcon";
import { BasicUserType, InvitationData } from "@/types/api.type";
import makeColorProfile from "@/utils/makeColorProfile";
import styles from "./TableList.module.css";
import { getAccessTokenFromDocument } from "@/utils/getAccessToken";
import sender from "@/apis/sender";
import { useRouter } from "next/router";
import useApi from "@/hooks/useApi";
import { Dispatch, SetStateAction, useState } from "react";
type TableIndexType = {
  [a: string]: "nickname" | "dashboard" | "inviter" | "email" | "deleteButton" | "acceptButton" | "cancelButton";
};

interface TableListProps {
  data: (BasicUserType | InvitationData)[];
  setData: Dispatch<SetStateAction<BasicUserType[]>> | Dispatch<SetStateAction<InvitationData[]>>;
  tableIndex: TableIndexType;
  row: number;
}

const TableList = ({ data, tableIndex, row, setData }: TableListProps) => {
  const column = Object.keys(tableIndex).length;
  const isAccept = Object.values(tableIndex).includes("acceptButton");
  const router = useRouter();

  const boardId = Number(router.query.boardId);

  const { wrappedFunction: deleteData } = useApi("delete");

  return (
    <ul className={isAccept ? styles.list__mobile : ""}>
      {data.map((data, idx) => {
        const arr = [];
        for (const key of Object.keys(tableIndex)) {
          const v = tableIndex[key];
          switch (true) {
            case v === "nickname":
              if (!(v in data)) continue;
              arr.push(
                <div className={styles.row__item} key={data[v]}>
                  <ProfileIcon member={data} tabIndex={-1} />
                  <p className={styles.row__item}>{data[v]}</p>
                </div>
              );
              continue;
            case v === "dashboard":
              if (!(v in data)) continue;
              arr.push(
                <div className={styles.row__item} key={data[v].title}>
                  {isAccept && <span className={styles.row__text__mobile}>{key}</span>}
                  <div className={styles.row__icon} style={{ backgroundColor: makeColorProfile(data[v].title) }} />
                  <p>{data[v].title}</p>
                </div>
              );
              continue;
            case v === "inviter":
              if (!(v in data)) continue;
              arr.push(
                <p className={styles.row__item} key={data[v].nickname}>
                  {isAccept && <span className={styles.row__text__mobile}>{key}</span>}
                  {data[v].nickname}
                </p>
              );
              continue;
            case v === "email":
              if ("inviter" in data) {
                arr.push(
                  <div className={styles.row__item} key={data.invitee[v]}>
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

                  if (res.status < 300) {
                    router.push("/mydashboard");
                  }
                };

                arr.push(
                  <div className={styles.acceptbutton__wrapper} key={v}>
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
                // 구성원 삭제하기
                const handleMemberDelete = async () => {
                  const accessToken = getAccessTokenFromDocument("accessToken");
                  const res = await deleteData({ path: "member", id: data.id, accessToken });
                  if (res?.status === 204) {
                    setData((prev) => prev.filter((member) => member.id !== data.id));
                  }
                };

                arr.push(
                  <Button onClick={handleMemberDelete} buttonType="delete" color="white" key={v}>
                    삭제
                  </Button>
                );
              }
              continue;
            case v === "cancelButton":
              {
                // 보낸 초대 요청 취소하기
                const handleInviteCancel = async () => {
                  const accessToken = getAccessTokenFromDocument("accessToken");
                  const res = await deleteData({
                    path: "dashboardInvitations",
                    dashboardId: boardId,
                    invitationId: data.id,
                    accessToken,
                  });
                  if (res?.status === 204) {
                    setData((prev) => prev.filter((invitation) => invitation.id !== data.id));
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
      {/* {row !== Infinity &&
        data.length < row &&
        Array(row - data.length)
          .fill("")
          .map((v, i) => <li className={styles.row} key={i}></li>)} */}
    </ul>
  );
};

export default TableList;
