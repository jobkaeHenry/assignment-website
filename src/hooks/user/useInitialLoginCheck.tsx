import { useRecoilState, useSetRecoilState } from "recoil";
import { LoginStatus, userInfoAtom } from "../../context/recoil/atom/user";
import { useEffect } from "react";
import { getLS } from "../../utils/localStorage";
import useLogout from "./useSetIsLogout";
import { getUserInfoByUserId } from "../../data/URL/server/userRoute";
import useAxiosPrivate from "../useAxiosPrivate";

/**
 * 로컬스토리지확인 후 토큰이 있다면 IsLogin을 True로 만들고,
 * 없을경우 비우는 Hooks
 */
const useInitialLoginCheck = async () => {
  const axiosPrivate = useAxiosPrivate();
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const [_isLogin, setIsLogin] = useRecoilState(LoginStatus);
  const setIslogOut = useLogout();

  useEffect(() => {
    const accessToken = getLS("accessToken");
    const refreshToken = getLS("refreshToken");

    if (accessToken && refreshToken) {
      axiosPrivate.get(getUserInfoByUserId).then(({ data }) => {
        const { userName, userId, isSeller } = data;
        setUserInfo({ userName, userId, isSeller });
        setIsLogin(true);
      });
    } else {
      setIslogOut();
    }
  }, []);
};

export default useInitialLoginCheck;
