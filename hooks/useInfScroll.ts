import { useEffect, useMemo, useRef, useState } from "react";

const useInfScroll = () => {
  const [isVisible, setIsVisible] = useState(false);
  const myRef = useRef<HTMLParagraphElement>(null);

  const observer = useMemo(() => {
    return new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsVisible(entry.isIntersecting);
    });
  }, []);

  useEffect(() => {
    if (myRef.current) {
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
