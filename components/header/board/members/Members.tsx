import styles from "@/components/header/board/members/Members.module.css";
import MembersProfile from "@/components/header/board/members/MembersProfile";
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
        <div className={styles.wrapper} key={member.id} data-index={idx}>
          <MembersProfile member={member} />
        </div>
      ))}
      <button
        className={clsx(styles.member, styles.count)}
        data-desktop-count={members.length - 4}
        data-mobile-count={members.length - 2}
        onTouchStart={() => (isOpen ? handleClose() : handleOpen())}
        onFocus={handleOpen}
        onBlur={handleClose}
        onMouseOver={handleOpen}
        onMouseOut={handleClose}
      />
      {isOpen ? (
        <ul className={styles.dropdown}>
          {members.slice(2).map((member, idx) => (
            <li className={styles.dropdown__list} key={idx} data-index={idx}>
              <MembersProfile member={member} />
              <span className={styles.dropdown__name}>{member.nickname}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
export default Members;
