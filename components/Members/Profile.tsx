import { Member } from "@/components/Header/Header.type";
import { useState } from "react";
import styles from "./Profile.module.css";
import ProfilePopup from "./ProfilePopup";
import ProfileIcon from "@/components/Members/ProfileIcon";
import clsx from "clsx";

interface ProfileProps {
  idx?: number;
  className?: string;
  member: Member | Member[];
}

const Profile = ({ member, idx, ...props }: ProfileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

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
        onMouseOver={handleOpen}
        onMouseOut={handleClose}
        onFocus={handleOpen}
        onBlur={handleClose}
        data-index={idx}
        {...whenArray}
        {...props}
      />
      {isOpen && <ProfilePopup member={Array.isArray(member) ? member.slice(2) : member} />}
    </div>
  );
};

export default Profile;
