import styles from "./Profile.module.css";
import ProfileIcon from "@/components/header/members/ProfileIcon";
import ProfilePopup from "@/components/header/members/ProfilePopup";
import { ProfileProps } from "@/components/header/header.type";
import { useState } from "react";

const Profile = ({ member, idx, ...props }: ProfileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <ProfileIcon member={member} onMouseOver={handleOpen} onMouseOut={handleClose} data-index={idx} {...props} />
      {isOpen && <ProfilePopup member={member} />}
    </div>
  );
};

export default Profile;
