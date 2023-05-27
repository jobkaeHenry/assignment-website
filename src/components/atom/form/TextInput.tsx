import { css, Interpolation, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import React, { InputHTMLAttributes } from "react";
import { FontWeightType } from "../../../types/typography";

export interface TextInputProp
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onClick" | "pattern"> {
  prependIcon?: any;
  onClickPrepend?: (e: React.MouseEvent<HTMLInputElement>) => void;
  appendIcon?: any;
  onClickAppend?: (e: React.MouseEvent<HTMLInputElement>) => void;
  width?: string;
  error?: boolean;
  weight?: FontWeightType;
  css?: Interpolation<Theme>;
}

const TextInput = React.forwardRef(
  (props: TextInputProp, ref: React.ForwardedRef<HTMLInputElement>) => {
    const {
      width,
      onClickPrepend,
      onClickAppend,
      prependIcon,
      appendIcon,
      ...others
    } = props;

    const Icon = prependIcon || appendIcon;

    return (
      <InputWrapper
        css={css`
          position: relative;
          width: ${width};
        `}
      >
        {appendIcon && (
          <Icon
            css={css`
              position: absolute;
              right: 8px;
            `}
            onClick={onClickAppend}
          />
        )}
        <Input type={"text"} ref={ref} {...others} />
        {appendIcon && (
          <Icon
            css={css`
              position: absolute;
              right: 8px;
            `}
            onClick={onClickPrepend}
          />
        )}
      </InputWrapper>
    );
  }
);

const Input = styled.input`
  & {
    padding: 16px;
    padding-right: ${(props: TextInputProp) =>
      props.appendIcon ? "48px" : ""};
    padding-left: ${(props: TextInputProp) =>
      props.prependIcon ? "48px" : ""};
    outline-style: solid;
    outline-width: 1px;
    font-weight: ${(props) => (props.weight ? props.weight : "var(--bold)")};
    font-size: 1rem;
    width: 100%;
    outline-color: var(--line-gray);
    border-radius: 6px;
    resize: none;
    accent-color: var(--main);
  }
  &:disabled {
    background-color: #eee;
    color: var(--font-light-gray);
  }
  &:focus {
    filter: ${(props) =>
      props.error
        ? "drop-shadow(0px 0px 2px var(--alert-red))"
        : "drop-shadow(0px 0px 2px var(--main))"};
    color: var(--font-main);
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export default TextInput;
