import { useSetRecoilState } from "recoil";
import { LoginStatus } from "../../context/recoil/atom/user";
import { setLS } from "../../utils/localStorage";

interface LoginHandler {
  accessToken: string;
  refreshToken: string;
}
/**
 * 로컬스토리지에 ACC,REF 토큰을 저장하고, Recoil isLogin을 True로 바꾸는 함수를 리턴하는 훅
 * @returns loginHandler( { accessToken, refreshToken} )
 */
const useSetIsLogin = () => {
  const setIsLogin = useSetRecoilState(LoginStatus);
  /**
   * 로컬스토리지에 ACC,REF 토큰을 저장하고, Recoil isLogin을 True로 바꾸는 함수
   */
  const loginHandler = ({ accessToken, refreshToken }: LoginHandler) => {
    setLS("accessToken", accessToken);
    setLS("refreshToken", refreshToken);
    setIsLogin(true);
  };

  return loginHandler;
};

export default useSetIsLogin;
