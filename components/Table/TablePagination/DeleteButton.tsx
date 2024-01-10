import sender from "@/apis/sender";
import Button from "@/components/Buttons/Button/Button";
import AlertModal from "@/modals/AlertModal";
import { InvitationData, Member } from "@/types/api.type";
import { getAccessTokenFromDocument } from "@/utils/getAccessToken";
import { SetStateAction } from "jotai";
import Image from "next/image";
import { Dispatch, FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { accessTokenAtom } from "@/atoms/atoms";
import { useRouter } from "next/router";

interface DeleteButtonProps {
  data: Member;
}

const DeleteButton = ({ data }: DeleteButtonProps) => {
  const [isMemberDeleteModalOpen, setIsMemberDeleteModalOpen] = useState(false);
  const handleMemberDeleteModalToggle = () => {
    setIsMemberDeleteModalOpen((prev) => !prev);
  };

  const router = useRouter();

  const boardId = Number(router.query.boardId);

  const accessToken = useAtomValue(accessTokenAtom);

  const queryClient = useQueryClient();

  const memberMutation = useMutation({
    mutationFn: () =>
      sender.delete({
        path: "member",
        id: data.id,
        accessToken,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["members", boardId] }),
  });

  const handleMemberDelete = async (e: FormEvent) => {
    e.preventDefault();
    const res = await memberMutation.mutate();
    handleMemberDeleteModalToggle();
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
