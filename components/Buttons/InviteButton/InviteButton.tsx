import useInputController from "@/hooks/useInputController";
import useApi from "@/hooks/useApi";
import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { signinEmail } from "@/constants/inputConfig";
import { getAccessTokenFromDocument } from "@/utils/getAccessToken";
import SingleInputModal from "@/modals/SingleInputModal";
import InnerInviteButton from "@/components/Table/TablePagination/InnerInviteButton";
import HeaderButton from "@/components/Header/HeaderButton/HeaderButton";
import headerButtonStyles from "@/components/Header/Header.module.css";
import { Member, InvitationData } from "@/types/api.type";
import { useRouter } from "next/router";
import Head from "next/head";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { accessTokenAtom } from "@/atoms/atoms";
import sender from "@/apis/sender";

type Usage = "header" | "edit_page";

interface InviteButtonProps {
  boardId?: number;
  usage: Usage;
  className?: string;
}
const InviteButton = ({ usage, className }: InviteButtonProps) => {
  const inviteInput = useInputController(signinEmail);

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const router = useRouter();
  const boardId = Number(router.query.boardId);

  const handleInviteModalToggle = () => {
    inviteInput.wrapper.setErrorText("");
    setIsInviteModalOpen((prev) => !prev);
    inviteInput.input.setValue("");
  };

  const accessToken = useAtomValue(accessTokenAtom);

  const queryClient = useQueryClient();

  const invitationMutation = useMutation({
    mutationFn: () =>
      sender.post({
        path: "invitation",
        id: boardId,
        data: {
          email: inviteInput.input.value,
        },
        accessToken,
      }),
    onSuccess: (res) => {
      if (res.message) {
        inviteInput.input.setValue("");
        inviteInput.wrapper.setErrorText(res.message);
        return;
      }
      handleInviteModalToggle();
      inviteInput.input.setValue("");
      queryClient.invalidateQueries({ queryKey: ["dashboardInvitations", boardId] });
    },
  });

  const handleInviteUserSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await invitationMutation.mutate();
  };

  return (
    <>
      {usage === "header" && (
        <div className={headerButtonStyles.grid__invite}>
          <HeaderButton onClick={handleInviteModalToggle} src="/icons/icon-addbox.svg" alt="대시보드로 초대하기">
            초대하기
          </HeaderButton>
        </div>
      )}
      {usage === "edit_page" && <InnerInviteButton className={className} onClick={handleInviteModalToggle} />}
      {isInviteModalOpen && (
        <SingleInputModal
          disabled={!inviteInput.input.value || !!inviteInput.wrapper.errorText}
          handleModalClose={handleInviteModalToggle}
          buttonText="초대"
          onSubmit={handleInviteUserSubmit}
          inputController={inviteInput}
          title="초대하기"
        />
      )}
    </>
  );
};

export default InviteButton;
