import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { LoginStatus, userInfoAtom } from "../../context/recoil/atom/user";
import { removeLS } from "../../utils/localStorage";
import { useQueryClient } from "react-query";

/**
 * 로컬스토리지를 비우고 Recoil의 isLogin을 False로 만드는 함수 를 리턴하는 훅
 * @returns logoutHandler
 */
const useLogout = () => {
  const setIsLogin = useSetRecoilState(LoginStatus);
  const resetUserInfo = useResetRecoilState(userInfoAtom);
  const { userId } = useRecoilValue(userInfoAtom);
  const queryClient = useQueryClient();

  /**
   * 로컬스토리지를 비우고 Recoil의 isLogin을 False로 만드는 함수
   */
  const setIsLogout = () => {
    removeLS("accessToken");
    removeLS("refreshToken");
    resetUserInfo();
    setIsLogin(false);
    queryClient.removeQueries(["cartitems", userId]);
  };

  return setIsLogout;
};

export default useLogout;
