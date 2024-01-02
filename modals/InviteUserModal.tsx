import useInputController from "@/hooks/useInputController";
import useApi from "@/hooks/useApi";
import { useState, FormEvent } from "react";
import { signinEmail } from "@/constants/inputConfig";
import { getAccessTokenFromDocument } from "@/utils/getAccessToken";
import SingleInputModal from "@/modals/SingleInputModal";
import InviteButton from "@/components/Table/TablePagination/InviteButton";
import HeaderButton from "@/components/Header/HeaderButton/HeaderButton";
import headerButtonStyles from "@/components/Header/Header.module.css";

type Usage = "header" | "edit_page";

interface InviteUserModalProps {
  boardId: number;
  usage: Usage;
  className?: string;
}
const InviteUserModal = ({ boardId, usage, className }: InviteUserModalProps) => {
  const inviteInput = useInputController(signinEmail);

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const handleInviteModalToggle = () => {
    inviteInput.wrapper.setErrorText("");
    setIsInviteModalOpen((prev) => !prev);
  };

  const { wrappedFunction: postData } = useApi("post");

  const handleInviteUserSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const accessToken = getAccessTokenFromDocument("accessToken");
    const res = await postData({
      path: "invitation",
      id: Number(boardId),
      data: {
        email: inviteInput.input.value,
      },
      accessToken,
    });

    if (!res) return;

    if (res.status === 201) {
      handleInviteModalToggle();
      inviteInput.input.setValue("");
    }

    if (res.status > 400 && res.message) {
      inviteInput.input.setValue("");
      inviteInput.wrapper.setErrorText(res.message);
    }
  };

  return (
    <div>
      {/* 모달과 관련된 JSX */}
      {usage === "header" && (
        <div className={headerButtonStyles.grid__invite}>
          <HeaderButton onClick={handleInviteModalToggle} src="/icons/icon-addbox.svg" alt="대시보드로 초대하기">
            초대하기
          </HeaderButton>
        </div>
      )}
      {usage === "edit_page" && <InviteButton className={className} onClick={handleInviteModalToggle} />}
      {isInviteModalOpen && (
        <SingleInputModal
          handleModalClose={handleInviteModalToggle}
          buttonText="초대"
          onSubmit={handleInviteUserSubmit}
          inputController={inviteInput}
          title="초대하기"
        />
      )}
    </div>
  );
};

export default InviteUserModal;