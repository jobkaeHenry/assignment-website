import { useRecoilValue } from "recoil";
import { LoginStatus } from "../../context/recoil/atom/user";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../atom/form/Button";
import { login, userPage, signUp } from "../../data/URL/local/user/url";
import Text from "../atom/Text";
import styled from "@emotion/styled";

import Logo from "./../atom/Logo";
import useLogout from "../../hooks/user/useSetIsLogout";

const Navbar = () => {
  const logoutHandler = useLogout();
  const hasLogin = useRecoilValue(LoginStatus);
  const navigate = useNavigate();

  return (
    <NavWrapper>
      <Link to={"/"}>
        <Logo />
      </Link>
      <ButtonWrapper>
        {hasLogin ? (
          <>
            <Link to={userPage}>
              <Text typography="p" weight={"var(--medium)"}>
                마이페이지
              </Text>
            </Link>

            <Text
              typography="p"
              weight={"var(--medium)"}
              onClick={logoutHandler}
            >
              로그아웃
            </Text>
          </>
        ) : (
          <>
            <Link to={login}>
              <Text typography="p" weight={"var(--medium)"}>
                로그인
              </Text>
            </Link>
            <Link to={signUp}>
              <Text typography="p" weight={"var(--medium)"}>
                회원가입
              </Text>
            </Link>
          </>
        )}
      </ButtonWrapper>
    </NavWrapper>
  );
};
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
  gap: 24px;
  width: 100%;
  max-width: 60%;
`;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 76px;
  padding: 14px 16px;
  display: flex;
  z-index: 50;
  border-bottom: 1px solid var(--line-gray);
  justify-content: space-between;
  align-items: center;
  background-color: var(--pure-white);
`;

export default Navbar;
