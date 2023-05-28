import styled from "@emotion/styled";

type Props = {
  height?: string;
  error?:boolean
};

const TextArea = styled.textarea`
  resize: none;
  border: 1px solid var(--line-gray);
  
  border-radius: 8px;
  padding: 16px;
  height: ${(props: Props) => (props.height ? props.height : "")};
  &:focus{
    border: 1px solid var(--main);
  }
  border-color:${(props: Props) => (props.error ? 'var(--alert-red)' : "")}
`;

export default TextArea;
