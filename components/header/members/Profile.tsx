import { Member } from "@/components/Header/Header.type";
import { useState } from "react";
import styles from "./Profile.module.css";
import ProfileIcon from "./ProfileIcon";
import ProfilePopup from "./ProfilePopup";

interface ProfileProps {
  idx?: number;
  className?: string;
  member: Member;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  onTouchStart?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

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
      <ProfileIcon
        member={member}
        size="lg"
        onMouseOver={handleOpen}
        onMouseOut={handleClose}
        data-index={idx}
        {...props}
      />
      {isOpen && <ProfilePopup member={member} />}
    </div>
  );
};

export default Profile;
