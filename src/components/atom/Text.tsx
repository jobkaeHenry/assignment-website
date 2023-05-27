import styled from "@emotion/styled";
import { FontWeightType, TypographyType } from "../../types/typography";

export interface TextProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  typography: TypographyType;
  bold?: boolean;
  weight?: FontWeightType;
  align?: string;
  color?: string;
}

const Text = styled.span`
  display: ${(props: TextProps) => (props.align ? "block" : "inline")};
  text-align: ${(props: TextProps) => (props.align ? props.align : "")};
  color: ${(props: TextProps) => (props.color ? `${props.color}` : "")};
  font-size: ${(props: TextProps) => `var(--${props.typography})`};
  font-weight: ${(props: TextProps) => (props.bold ? "var(--bold)" : null)};
  font-weight: ${(props: TextProps) => (props.weight ? props.weight : "")};
`;

export default Text;
