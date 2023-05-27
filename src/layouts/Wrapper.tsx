import styled from "@emotion/styled";

interface WrapperProps {
  noGap?: boolean;
}

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${(props: WrapperProps) => (props.noGap ? "0" : "8px")};
  align-items: center;
`;

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props: WrapperProps) => (props.noGap ? "0" : "8px")};
  justify-content: center;
  &.center{
    align-items: center;
  }
`;
