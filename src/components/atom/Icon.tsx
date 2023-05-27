import styled from "@emotion/styled";

type IconProps = {
  url: string;
  size?: number;
};

const Icon = styled.button`
  width: ${(props: IconProps) =>
    props.size ? String(props.size) : "16"}px;
  height: ${(props: IconProps) =>
    props.size ? String(props.size) : "16"}px;
  background-image: ${(props: IconProps) =>
    props.url ? `url(${String(props.url)})` : ""};
  background-position: center;
  background-color:transparent;
  background-repeat: no-repeat;
  background-size: contain;
`;

export default Icon;
