


import useSetIsLogin from "./user/useSetIsLogin";
import useSetIsLogout from "./user/useSetIsLogout";
import { getLS } from "../utils/localStorage";
import { refreshTokenURL } from "../data/URL/server/userRoute";
import axios from "../lib/api/axios";

const useRefreshToken = () => {
  const loginHandler = useSetIsLogin();
  const logoutHandler = useSetIsLogout();

  const refresh = async () => {
    const refreshToken = getLS("refreshToken");
    const response = await axios
      .post(refreshTokenURL, {
        refreshToken,
      })
      .then((res) => {
        const { accessToken, refreshToken } = res.data;
        loginHandler({ accessToken, refreshToken });
        return res.data;
      })
      .catch((err) => {
        /**로컬 스토리지 비우기 */
        if (err?.response?.status === 401) {
          logoutHandler();
        }
        return Promise.reject;
      });
    return response.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
