import { Member } from "@/components/header/Members.type";
import styles from "@/components/header/Members.module.css";
import Image from "next/image";
import clsx from "clsx";

interface Props {
  members: Member[];
}
const Members = ({ members }: Props) => {
  return (
    <div className={styles.container}>
      {members.slice(0, 4).map((member, idx) => (
        <div className={clsx(styles.member)} key={member.id} data-index={idx}>
          <Image
            className={styles.member__image}
            width={40}
            height={40}
            src={member.profileImageUrl}
            alt={member.nickname}
          />
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
