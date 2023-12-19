import styles from "@/components/header/board/Members.module.css";
import { MembersProps } from "@/components/header/header.type";
import { colorMapping } from "@/utils/colorMapping";
import clsx from "clsx";
import Image from "next/image";

const Members = ({ members }: MembersProps) => {
  return (
    <div className={styles.container}>
      {members.slice(0, 4).map((member, idx) => (
        <div className={clsx(styles.member)} key={member.id} data-index={idx}>
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
      ))}
      <button
        className={clsx(styles.member, styles.count)}
        data-desktop-count={members.length - 4}
        data-mobile-count={members.length - 2}
      />
    </div>
  );
};
export default Members;
