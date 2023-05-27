import styled from "@emotion/styled";
import React, { cloneElement, ReactElement } from "react";

type Props = {
  children: ReactElement | ReactElement[];
};

const FixedBottomCTA = (props: Props) => {
  const { children } = props;

  return (
    <Wrapper>
      {Array.isArray(children)
        ? children.map((elem, inedx) => {
            return cloneElement(elem, {
              type: elem.props.type ? elem.props.type : "button",
              key: inedx,
            });
          })
        : cloneElement(children, { type: "button" })}
    </Wrapper>
  );
};

export default FixedBottomCTA;

const Wrapper = styled.div`
  position: fixed;
  background-color: var(--pure-white);
  bottom: 0;
  left: 0;
  padding: 8px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
