import ProfileIcon from "@/components/Members/ProfileIcon";
import { BasicUserType } from "@/types/api.type";
import clsx from "clsx";
import { useState } from "react";
import styles from "./Profile.module.css";
import ProfilePopup from "./ProfilePopup";

interface ProfileProps {
  idx?: number;
  className?: string;
  member: BasicUserType | BasicUserType[];
}

const Profile = ({ member, idx, ...props }: ProfileProps) => {
  const whenArray = Array.isArray(member)
    ? {
        className: clsx(styles.button, {
          [styles.hidebutton__desktop]: member.length <= 4,
          [styles.hidebutton__mobile]: member.length <= 2,
        }),
        ["data-desktop-count"]: member.length - 4,
        ["data-mobile-count"]: member.length - 2,
      }
    : {};

  return (
    <div className={styles.container}>
      <ProfileIcon
        member={Array.isArray(member) ? { id: 0, nickname: "", profileImageUrl: "" } : member}
        data-index={idx}
        {...whenArray}
        {...props}
      />
    </div>
  );
};

export default Profile;
