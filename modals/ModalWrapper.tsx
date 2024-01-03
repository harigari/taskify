import { ReactNode, useEffect, useRef, useState, MouseEvent } from "react";
import { createPortal } from "react-dom";
import styles from "./ModalWrapper.module.css";
import useNotScroll from "@/hooks/useNotScroll";

interface ModalWrapperProp {
  children: ReactNode;
  size: "lg" | "md" | "sm";
  handleModalClose: (e: MouseEvent) => void;
}

/** size는 모달의 크기만 구분하기 때문에 세부적인 건 다른 곳에서 처리해야한다 */
const ModalWrapper = ({ children, size, handleModalClose }: ModalWrapperProp) => {
  const portalRoot = document.getElementById("modal-root") as HTMLElement;

  // const modalRef = useRef(null);

  // const modalOutsideClick = (e: MouseEvent) => {
  //   if (modalRef.current !== e.target) {
  //     handleModalClose(e);
  //   }
  // };
  return createPortal(
    <div className={styles.root}>
      <div className={styles[size]}>{children}</div>
    </div>,
    portalRoot
  );
};

export default ModalWrapper;
