import styled from "@emotion/styled";

type Props = {
  message: string;
};

const ErrorMessage = ({ message }: Props) => {
  return <ErrorComponent>{message}</ErrorComponent>;
};

const ErrorComponent = styled.div`
  padding: 8px;
  color: var(--alert-red);
  border: 1px solid var(--alert-red);
  border-radius: 8px;
  background-color: var(--pure-white);
  text-align: center;
`;
export default ErrorMessage;
