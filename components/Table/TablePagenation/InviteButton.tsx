import { clsx } from "clsx";
import Image from "next/image";
import styles from "./InivteButton.module.css";

interface InviteButtonProps {
  className?: string;
}

const InviteButton = ({ className = "" }: InviteButtonProps) => {
  return (
    <button className={clsx(styles[className], styles.invitebutton)}>
      <Image width={16} height={16} src="/images/icons/icon-addbox-white.svg" alt="새로운 구성원 초대하기" />
      <span>초대하기</span>
    </button>
  );
};

export default InviteButton;
