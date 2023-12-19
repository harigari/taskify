import Image from "next/image";
import styles from "@/components/header/board/members/Members.module.css";
import { colorMapping } from "@/utils/colorMapping";
import { MembersProfileProps } from "@/components/header/header.type";
import { useState } from "react";

const MembersProfile = ({ member }: MembersProfileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={styles.member}
        onTouchStart={() => (isOpen ? handleClose() : handleOpen())}
        onFocus={handleOpen}
        onBlur={handleClose}
        onMouseOver={handleOpen}
        onMouseOut={handleClose}
        tabIndex={0}
      >
        {member.profileImageUrl ? (
          <Image
            className={styles.member__image}
            width={40}
            height={40}
            src={member.profileImageUrl}
            alt={member.nickname}
          />
        ) : (
          <div className={styles.member__defaultimage} style={{ backgroundColor: colorMapping(member.nickname) }} />
        )}
        <span className={styles.member__name}>{member.nickname.slice(0, 1)}</span>
      </div>
      {isOpen ? (
        <ul className={styles.dropdown}>
          <li className={styles.dropdown__list} key={member.id}>
            <div className={styles.member}>
              {member.profileImageUrl ? (
                <Image
                  className={styles.member__image}
                  width={40}
                  height={40}
                  src={member.profileImageUrl}
                  alt={member.nickname}
                />
              ) : (
                <div
                  className={styles.member__defaultimage}
                  style={{ backgroundColor: colorMapping(member.nickname) }}
                />
              )}
              <span className={styles.member__name}>{member.nickname.slice(0, 1)}</span>
            </div>
            <span className={styles.dropdown__name}>{member.nickname}</span>
          </li>
        </ul>
      ) : null}
    </>
  );
};

export default MembersProfile;
