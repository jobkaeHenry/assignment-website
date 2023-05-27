import { AxiosError } from "axios";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { FormValues } from "../types/FormValueType";
import useSetIsLogin from "../../../hooks/user/useSetIsLogin";
import { login } from "../../../data/URL/local/user/url";
import axios from "../../../lib/api/axios";

/**
 * 로그인 핸들러와 에러메시지를 리턴하는 함수
 */
export const useLoginHandler = () => {
  const loginHandler = useSetIsLogin();
  const from = useLocation().state?.from?.pathname || "/";
  const navigate = useNavigate();
  const [serverSentError, setServerSentError] = useState("");

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    axios
      .post(login, data)
      .then((res) => {
        const { accessToken } = res.data;
        const { refreshToken } = res.data;
        loginHandler({ accessToken, refreshToken });
        navigate(from);
      })
      .catch((err: AxiosError<{ message: string }>) => {
        console.log(err);
        const ErrorCode = err?.response?.status;
        if (err.response?.data.message) {
          setServerSentError(err.response?.data.message);
          return;
        }
        if (ErrorCode && ErrorCode > 499) {
          setServerSentError("server Error");
          return;
        }
        if (ErrorCode && ErrorCode === 403) {
          setServerSentError("wrong Password");
          return;
        }
      });
  };
  return { onSubmit, errorMessage: serverSentError };
};
