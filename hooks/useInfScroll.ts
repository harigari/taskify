import { useEffect, useMemo, useRef, useState } from "react";

const useInfScroll = () => {
  // 보여지고 있는지를 나타내는 state
  const [isVisible, setIsVisible] = useState(false);
  const myRef = useRef<HTMLParagraphElement>(null);

  // new IntersectionObserver()로 생성한 인스턴스로 관찰자를 초기화하고 관찰할 대상을 지정
  const observer = useMemo(() => {
    return new IntersectionObserver((entries) => {
      // entries는 인스턴스의 배열
      const entry = entries[0];
      // isIntersecting은 교차 되고 있는지를 알려주는 boolean 값
      setIsVisible(entry.isIntersecting);
    });
  }, []);

  useEffect(() => {
    if (myRef.current) {
      // 관찰할 대상 등록
      observer.observe(myRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [isVisible, myRef.current]);

  return {
    isVisible,
    setIsVisible,
    myRef,
  };
};

export default useInfScroll;
