import { useSetRecoilState } from "recoil";
import { LoginStatus } from "../../context/recoil/atom/user";
import { removeLS } from "../../utils/localStorage";

/**
 * 로컬스토리지를 비우고 Recoil의 isLogin을 False로 만드는 함수 를 리턴하는 훅
 * @returns logoutHandler
 */
const useLogout = () => {
  const setIsLogin = useSetRecoilState(LoginStatus);
  /**
   * 로컬스토리지를 비우고 Recoil의 isLogin을 False로 만드는 함수
   */
  const setIsLogout = () => {
    removeLS("accessToken");
    removeLS("refreshToken");
    setIsLogin(false);
  };

  return setIsLogout;
};

export default useLogout;
