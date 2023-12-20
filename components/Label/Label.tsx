import { ReactNode } from "react";
import styles from "./ModalLabel.module.css";
import clsx from "clsx";

interface ModalLabelProp {
  htmlFor?: string;
  children: ReactNode;
  mobile?: boolean;
  essential?: boolean;
}

function Label({ htmlFor, children, mobile = false, essential = false }: ModalLabelProp) {
  const labelStyle = clsx(styles.root, mobile && styles.mobile);
  const starStyle = clsx(styles.essential, essential && styles.star);

  return (
    <label htmlFor={htmlFor} className={labelStyle}>
      {children} <span className={starStyle}>*</span>
    </label>
  );
}

export default Label;
