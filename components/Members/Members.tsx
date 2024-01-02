import { Member } from "@/types/api.type";
import styles from "./Members.module.css";
import Profile from "./Profile";
import ProfilePopup from "./ProfilePopup";
import { useState } from "react";

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
        <Profile key={member.id} member={member} idx={idx} />
      ))}
      <Profile member={members} />
      {isOpen && <ProfilePopup member={members} />}
    </div>
  );
};
export default Members;
