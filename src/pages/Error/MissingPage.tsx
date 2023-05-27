import { Button } from "../../components/atom/form/Button";
import MobileWrapper from "../../layouts/MobileWrapper";
import { ColumnWrapper } from "../../layouts/Wrapper";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Text from "../../components/atom/Text";
import logo from "../../assets/logo.jpg";
import useSetTitle from "../../hooks/useSetTitle";

const Missing = () => {
  useSetTitle('Not found')
  const [timer, setTimer] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const timeReducer = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
      if (timer === 0) {
        clearInterval(timeReducer);
        navigate("/");
      }
    }, 1000);
    return () => clearInterval(timeReducer);
  }, [timer]);

  return (
    <MobileWrapper>
      <ColumnWrapper
        css={css`
          align-items: center;
        `}
      >
        <Link to={"/"}>
          <Logo src={logo} alt="로고" />
        </Link>
        <Text typography="h3">존재하지않는 페이지입니다</Text>
        <Text typography="p">{timer}초 후 메인페이지로 이동합니다</Text>
        <Link to={"/"}>
          <Button className="mt-16 ghost_hover">홈으로 이동</Button>
        </Link>
      </ColumnWrapper>
    </MobileWrapper>
  );
};
const Logo = styled.img`
  width: 150px;
  height: 150px;
`;

export default Missing;
