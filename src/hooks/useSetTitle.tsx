import { useEffect } from "react";

/**
 * 패스네임을 받아 헤더의 타이틀을 변경하는 Hooks
 * @param pageName JobkaeHenry | ${pathName}
 */
const useSetTitle = (pageName: string) => {
  useEffect(() => {
    const header = document.getElementsByTagName("title")[0];
    header.innerText = `JobkaeHenry | ${pageName}`;
  }, []);
};

export default useSetTitle;
