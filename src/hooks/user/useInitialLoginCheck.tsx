import { useRecoilState } from "recoil";
import { LoginStatus } from "../../context/recoil/atom/user";
import { useEffect } from "react";
import { getLS } from "../../utils/localStorage";
import useLogout from "./useSetIsLogout";

/**
 * 로컬스토리지확인 후 토큰이 있다면 IsLogin을 True로 만들고,
 * 없을경우 비우는 Hooks
 */
const useInitialLoginCheck = () => {
  const [_isLogin, setIsLogin] = useRecoilState(LoginStatus);
  const setIslogOut = useLogout()


  useEffect(() => {
    const accessToken = getLS("accessToken");
    const refreshToken = getLS("refreshToken");

    if (accessToken && refreshToken) {
      setIsLogin(true);
    } else {
      setIslogOut()
    }
  }, []);
};

export default useInitialLoginCheck;
