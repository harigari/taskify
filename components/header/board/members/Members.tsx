import styles from "@/components/header/board/members/Members.module.css";
import Profile from "@/components/header/board/members/Profile";
import ProfilePopup from "@/components/header/board/members/ProfilePopup";
import { MembersProps } from "@/components/header/header.type";
import clsx from "clsx";
import { useState } from "react";

const Members = ({ members }: MembersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      {members.slice(0, 4).map((member, idx) => (
        <Profile key={member.id} member={member} idx={idx} />
      ))}
      <Profile
        member={{ id: 0, nickname: "", profileImageUrl: "" }}
        className={clsx(styles.button, {
          [styles.hidebutton]: members.length < 5,
        })}
        data-desktop-count={members.length - 4}
        data-mobile-count={members.length - 2}
        onTouchStart={() => (isOpen ? handleClose() : handleOpen())}
        onFocus={handleOpen}
        onBlur={handleClose}
        onMouseOver={handleOpen}
        onMouseOut={handleClose}
      />
      {isOpen && <ProfilePopup member={members.slice(2)} />}
    </div>
  );
};
export default Members;
