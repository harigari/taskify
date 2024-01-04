import sender from "@/apis/sender";
import Button from "@/components/Buttons/Button/Button";
import AlertModal from "@/modals/AlertModal";
import { InvitationData, Member } from "@/types/api.type";
import { getAccessTokenFromDocument } from "@/utils/getAccessToken";
import { SetStateAction } from "jotai";
import Image from "next/image";
import { Dispatch, FormEvent, useState } from "react";

interface DeleteButtonProps {
  data: Member;
  setData: Dispatch<SetStateAction<(Member | InvitationData)[]>>;
}

const DeleteButton = ({ data, setData }: DeleteButtonProps) => {
  const [isMemberDeleteModalOpen, setIsMemberDeleteModalOpen] = useState(false);
  const handleMemberDeleteModalToggle = () => {
    setIsMemberDeleteModalOpen((prev) => !prev);
  };

  const handleMemberDelete = async (e: FormEvent) => {
    e.preventDefault();
    const accessToken = getAccessTokenFromDocument("accessToken");
    const res = await sender.delete({ path: "member", id: data.id, accessToken });
    if (res?.status === 204) {
      setData((prev) => prev.filter((member) => member.id !== data.id));
      handleMemberDeleteModalToggle();
    }
  };

  if ("isOwner" in data && data.isOwner) {
    return (
      <div style={{ marginLeft: "2rem" }} key={data.id}>
        <Image width={30} height={30} src="/icons/icon-crown.svg" alt="내가 만든 대시보드" />
      </div>
    );
  }
  return (
    <>
      <Button
        disabled={"isOwner" in data ? data.isOwner : false}
        onClick={handleMemberDeleteModalToggle}
        buttonType="delete"
        color="white"
        key={data.id}
      >
        삭제
      </Button>
      {isMemberDeleteModalOpen && (
        <AlertModal
          alertText="구성원을 삭제하시겠습니까?"
          handleSubmit={handleMemberDelete}
          handleModalClose={handleMemberDeleteModalToggle}
        />
      )}
    </>
  );
};

export default DeleteButton;
