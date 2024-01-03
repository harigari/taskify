import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ModalWrapper.module.css";

interface ModalWrapperProp {
  children: ReactNode;
  size: "lg" | "md" | "sm";
}

/** size는 모달의 크기만 구분하기 때문에 세부적인 건 다른 곳에서 처리해야한다 */
const ModalWrapper = ({ children, size }: ModalWrapperProp) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const portalRoot = typeof document !== "undefined" ? document.getElementById("modal-root") : null;

  if (!portalRoot) return null;

  return createPortal(
    <div className={styles.root}>
      <div className={styles[size]}>{children}</div>
    </div>,
    portalRoot
  );
};

export default ModalWrapper;
