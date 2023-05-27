import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";


type skeletonPropsType = {
  count?: number;
};

export const SkeletonRepeated = ({ count = 5 }: skeletonPropsType) => {
  return (
    <>
      {[...Array(count)].map((_e, i) => {
        return (
          <SkeletonWrapper key={i}>
            <Skeleton />
            <Skeleton width="calc(100% - 16px)" height="36px" />
          </SkeletonWrapper>
        );
      })}
    </>
  );
};

const pulse = keyframes`
  0% {
    background-color: var(--bg-gray);
  }
  50% {
    background-color: var(--line-light-gray);
  }
  100% {
    background-color: var(--bg-gray);
  }
`;

interface SkeletonProps {
  width?: string;
  height?: string;
}

const Skeleton = styled.div`
  width: ${(props: SkeletonProps) => (props.width ? props.width : "16px")};
  height: ${(props: SkeletonProps) => (props.height ? props.height : "16px")};
  animation-name: ${pulse};
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in;
`;

const SkeletonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 8px;
  overflow: hidden;
  margin-bottom: 8px;
`;
export default Skeleton;