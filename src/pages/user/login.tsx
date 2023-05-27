import InputWithLabel from "../../components/atom/form/InputWithLabel";

import { Button } from "../../components/atom/form/Button";
import MobileWrapper from "../../layouts/MobileWrapper";
import Text from "../../components/atom/Text";
import { signUp } from "../../data/URL/local/user/url";
import { useForm } from "react-hook-form";
import { emailRegExp, passwordRegExp } from "../../utils/regExp";
import { Link } from "react-router-dom";
import { useLoginHandler } from "../../feature/login/handler/loginHandler";
import { FormValues } from "../../feature/login/types/FormValueType";
import useSetTitle from "../../hooks/useSetTitle";

const Login = () => {
  useSetTitle("Login");
  // 수정필요 errorMessage
  const { onSubmit, errorMessage } = useLoginHandler();
  // 훅 폼
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <>
      <MobileWrapper as={"form"} onSubmit={handleSubmit(onSubmit)}>
        <InputWithLabel
          autoFocus
          type={"email"}
          inputWidth={"100%"}
          weight={"var(--regular)"}
          label={"이메일"}
          placeholder={"이메일"}
          autoComplete={"username"}
          error={errors.email ? true : false}
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
          placeholder={"8자리이상, 특수문자, 알파벳, 숫자 포함"}
          autoComplete={"current-password"}
          error={errors.password ? true : false}
          // 패스워드 훅폼
          {...register("password", {
            required: true,
            pattern: passwordRegExp,
          })}
        />
        <Text role={"alert"} typography={"p"} color={"var(--alert-red)"}>
          {errorMessage}
        </Text>
        <Button type="submit">로그인</Button>

        <Link to={signUp}>
          <Text typography={"p"} color={"var(--font-gray)"}>
            계정이 없으신가요?
            <Text typography={"p"} color={"var(--sub-color)"} bold>
              {` 회원가입`}
            </Text>
          </Text>
        </Link>
      </MobileWrapper>
    </>
  );
};
export default Login;
