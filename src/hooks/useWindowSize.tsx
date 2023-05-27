import { useState, useEffect } from "react";

/** {width:number , height:number} 형태의 상/하단바 제외 px 사이즈를 리턴 */
const useWindowSize = () => {
  type propsType = { width: undefined | number; height: undefined | number };
  const [windowSize, setWindowSize] = useState<propsType>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

export default useWindowSize;
