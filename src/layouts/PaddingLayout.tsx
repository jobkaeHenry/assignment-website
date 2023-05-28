import styled from "@emotion/styled";

interface Props {
  flexDirection?: "row"|"column"
}

const PaddingLayout = styled.div`
  padding: 0 16px;
  display: flex;
  width: 100%;
  flex-direction: ${(props: Props) => (props.flexDirection ? props.flexDirection : "column")};
  gap: 16px;
`;
export default PaddingLayout;
