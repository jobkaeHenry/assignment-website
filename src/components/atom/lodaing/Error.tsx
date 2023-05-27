import styled from "@emotion/styled";

type Props = {
  message: string;
};

export const NotifyMessage = ({ message }: Props) => {
  return <NotifyComponent>{message}</NotifyComponent>;
};

const ErrorMessage = ({ message }: Props) => {
  return <ErrorComponent>{message}</ErrorComponent>;
};

const NotifyComponent = styled.div`
  width: fit-content;
  padding: 8px;
  color: var(--font-gray);
  border: 1px solid var(--line-gray);
  border-radius: 8px;
  background-color: var(--pure-white);
  text-align: center;
  margin: 0 auto;
`;

const ErrorComponent = styled.div`
  width: fit-content;
  padding: 8px;
  color: var(--alert-red);
  border: 1px solid var(--alert-red);
  border-radius: 8px;
  background-color: var(--pure-white);
  text-align: center;
  margin: 0 auto;
`;
export default ErrorMessage;
