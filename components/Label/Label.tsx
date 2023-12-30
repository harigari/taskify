import clsx from "clsx";
import { ReactNode } from "react";
import styles from "./Label.module.css";

interface ModalLabelProp {
  htmlFor?: string;
  children: ReactNode;
  mobile?: boolean;
  star?: boolean;
}

function Label({ htmlFor, children, mobile = false, star = false }: ModalLabelProp) {
  const labelStyle = clsx(styles.root, mobile && styles.mobile);
  const starStyle = clsx(styles.essential, star && styles.star);

  return (
    <label htmlFor={htmlFor} className={labelStyle}>
      {children} <span className={starStyle}>*</span>
    </label>
  );
}

export default Label;
