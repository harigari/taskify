import ProfileIcon from "@/components/Members/ProfileIcon";
import { Member } from "@/types/api.type";
import clsx from "clsx";
import { useState } from "react";
import styles from "./Members.module.css";
import ProfilePopup from "./ProfilePopup";

interface MembersProps {
  members: Member[];
}

const Members = ({ members }: MembersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const countStyle = {
    className: clsx(styles.count, {
      [styles.hidecount__desktop]: members.length <= 4,
      [styles.hidecount__mobile]: members.length <= 2,
    }),
    ["data-desktop-count"]: members.length - 4,
    ["data-mobile-count"]: members.length - 2,
  };

  return (
    <div
      tabIndex={0}
      onMouseOver={handleOpen}
      onMouseOut={handleClose}
      onFocus={handleOpen}
      onBlur={handleClose}
      className={styles.container}
    >
      {members.slice(0, 4).map((member, idx) => (
        <ProfileIcon key={member.id} member={member} data-index={idx} />
      ))}
      <div {...countStyle} />
      {isOpen && <ProfilePopup member={members} />}
    </div>
  );
};
export default Members;
