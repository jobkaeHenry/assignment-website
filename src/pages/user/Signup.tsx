import InputWithLabel from "../../components/atom/form/InputWithLabel";
import { login, signUp } from "../../data/URL/local/user/url";
import MobileWrapper from "../../layouts/MobileWrapper";
import axios from "../../lib/api/axios";
import { KoEnNumExp, emailRegExp, passwordRegExp } from "../../utils/regExp";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../../components/atom/form/Button";
import Text from "../../components/atom/Text";
import { Link, useNavigate } from "react-router-dom";
import useSetTitle from "../../hooks/useSetTitle";

type FormValues = {
  email: string;
  password: string;
  userName: string;
  isSamePassword: string;
};

const Signup = () => {
  useSetTitle("Sign up");
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  // 훅 폼
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { isSamePassword, ...otherData } = data;
    axios
      .post(signUp, otherData)
      .then(() => {
        alert("회원가입성공");
        navigate(login);
      })
      .catch((err) => {
        const ErrorCode = err?.response?.status;
        if (ErrorCode > 499) {
          setServerError("server Error");
        }
        if (ErrorCode === 401) {
          setServerError("wrong Password");
        }
      });
  };

  return (
    <>
      <MobileWrapper as={"form"} onSubmit={handleSubmit(onSubmit)}>
        <InputWithLabel
          type={"email"}
          inputWidth={"100%"}
          weight={"var(--regular)"}
          label={"이메일"}
          placeholder={"이메일"}
          error={errors.email?true:false}
          // 이메일 훅폼
          {...register("email", {
            required: true,
            pattern: emailRegExp,
          })}
        />

        <InputWithLabel
          type={"password"}
          label={"비밀번호"}
          inputWidth={"100%"}
          weight={"var(--regular)"}
          placeholder={"비밀번호"}
          error={errors.password?true:false}
          // 패스워드 훅폼
          {...register("password", {
            required: true,
            pattern: passwordRegExp,
          })}
        />
        <InputWithLabel
          type={"password"}
          label={"비밀번호 확인"}
          inputWidth={"100%"}
          weight={"var(--regular)"}
          placeholder={"비밀번호 확인"}
          // 패스워드 동일여부
          {...register("isSamePassword", {
            required: true,
            validate: (value) => {
              const password = getValues("password");
              return password === value;
            },
          })}
        />
        {/* 유저네임 */}
        <InputWithLabel
          type={"text"}
          label={"닉네임"}
          inputWidth={"100%"}
          weight={"var(--regular)"}
          placeholder={"닉네임을 입력해주세요"}
          error={errors.userName?true:false}
          {...register("userName", {
            required: true,
            pattern:KoEnNumExp,
            min: 2,
          })}
        />

        <Text role={"alert"} typography={"p"} color={"var(--alert-red)"}>
          {serverError}
        </Text>
        <Button type="submit">{"회원가입"}</Button>

        <Link to={login}>
          <Text typography={"p"} color={"var(--font-gray)"}>
            {"이미 계정이 있으신가요?"}
            <Text typography={"p"} color={"var(--sub-color)"} bold>
              {` ${"로그인"}`}
            </Text>
          </Text>
        </Link>
      </MobileWrapper>
    </>
  );
};

export default Signup;
