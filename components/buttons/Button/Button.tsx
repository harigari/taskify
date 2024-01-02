import clsx from "clsx";
import { MouseEvent, ReactNode } from "react";
import styles from "./Button.module.css";
import { BasicUserType, InvitationData } from "@/types/api.type";
import { useRouter } from "next/router";
import useApi from "@/hooks/useApi";
import { Dispatch, SetStateAction } from "react";
export type ButtonType =
  | "login"
  | "delete"
  | "add_column"
  | "plus_icon"
  | "dashboard"
  | "accept_reject"
  | "dashboard_delete";

type Color = "violet" | "white" | "gray";

interface Props {
  children: ReactNode;
  icon?: boolean;
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
  buttonType: ButtonType;
  color: Color;
  data?: BasicUserType | InvitationData;
  setId?: Dispatch<SetStateAction<number | undefined>>;
}

const Button = ({ children, disabled, onClick, buttonType, color, data, setId }: Props) => {
  const handleClick = (e: MouseEvent) => {
    // setId가 있고 data.id가 존재하면 setId(data.id) 호출
    if (setId && data?.id && onClick) {
      console.log(data.id);
      setId(data.id);
      onClick(e);
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={clsx(styles.common, buttonType && styles[buttonType], color && styles[color])}
    >
      {children}
    </button>
  );
};

export default Button;
