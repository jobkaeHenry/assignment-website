import styled from "@emotion/styled";

type ButtonType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface ButtonProps extends ButtonType {
  width?: string;
  disabled?: boolean | undefined;
  rounded?: boolean | undefined;
}

export const Button = styled.button`
  display: flex;
  gap: 8px;
  justify-content: center;
  font-size: var(--h4);
  align-items: center;
  padding: 12px 16px;
  border-radius: ${(props: ButtonProps) => (props.rounded ? "100px" : `8px`)};
  width: ${(props: ButtonProps) => (props.width ? props.width : `100%`)};
  background-color: ${(props: ButtonProps) =>
    props.disabled ? `var(--bg-gray)` : `var(--main)`};
  color: var(--pure-white);
  font-weight: var(--bold);

  &.ghost {
    color: var(--font-gray);
    background-color: var(--pure-white);
    border: 1px solid var(--line-gray);
  }
  &.no-line {
    background-color: var(--pure-white);
    border: none;
  }
`;

export const LinkButton = Button.withComponent("a");
