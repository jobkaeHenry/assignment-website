import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { axiosPrivate } from "../lib/api/axios";
import { getLS } from "../utils/localStorage";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();

  useEffect(() => {
    // 요청을 가로채는 인터셉터 (필요할때만 토큰을 싣기 위해)
    const accessToken = getLS("accessToken");

    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (config.headers && !config.headers["Authorization"] && accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 답변을 가로채는 인터셉터
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        } else return Promise.reject(error);
      }
    );

    return () => {
      // axios interceptor은 자동으로 이젝트 되지않으므로 다음 사용을 위해 eject함
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
