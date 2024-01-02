import { clsx } from "clsx";
import Image from "next/image";
import styles from "./InivteButton.module.css";
import useInputController from "@/hooks/useInputController";
import { signinEmail } from "@/constants/inputConfig";
import { useState, MouseEvent } from "react";

interface InviteButtonProps {
  className?: string;
  onClick: (e: MouseEvent) => void;
}

const InnerInviteButton = ({ className = "", onClick }: InviteButtonProps) => {
  const inviteInput = useInputController(signinEmail);

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const handleInviteModalToggle = () => {
    inviteInput.wrapper.setErrorText("");
    setIsInviteModalOpen((prev) => !prev);
  };

  return (
    <button onClick={onClick} className={clsx(styles[className], styles.invitebutton)}>
      <Image width={16} height={16} src="/icons/icon-addbox-white.svg" alt="새로운 구성원 초대하기" />
      <span>초대하기</span>
    </button>
  );
};

export default InnerInviteButton;
