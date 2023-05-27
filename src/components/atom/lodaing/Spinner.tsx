import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
  `;

type LoadingSpinnerProps = {
  size?: number;
};

const Spinner = styled.div`
  display: block;
  width: ${(props: LoadingSpinnerProps) => (props.size ? props.size : "56")}px;
  height: ${(props: LoadingSpinnerProps) => (props.size ? props.size : "56")}px;
  border: 7px solid var(--line-gray);
  border-radius: 100%;
  margin: 0 auto;
  border-top-color: var(--sub-color);
  animation: ${spin} 500ms linear infinite;
`;

export const LoadingSpinner = (props: LoadingSpinnerProps) => {
  // 200ms 이하일 경우에도 표시되면 깜빡이는 느낌이 들게됨
  const [isShow, setIsShow] = useState(false);
  const delay = 200;
  useEffect(() => {
    setTimeout(() => {
      setIsShow(true);
    }, delay);
  });
  return isShow ? <Spinner {...props} /> : <></>;
};
