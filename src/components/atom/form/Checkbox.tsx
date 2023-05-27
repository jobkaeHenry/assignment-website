import styled from "@emotion/styled";
import { InputHTMLAttributes, useId } from "react";

interface Props
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "name" | "defaultChecked"
  > {
  label: string;
}

const Checkbox = (props: Props) => {
  const { label, ...others } = props;
  const id = useId();
  return (
    <Label htmlFor={id}>
      <InputTypeCheckBox
        type={"checkbox"}
        id={id}
        name={props.name ? props.name : id}
        {...others}
      />
      {/* 커스터마이징 용 label */}
      <label htmlFor={id} />
      {/* 실제 라벨 컨텐츠 */}
      {label}
    </Label>
  );
};
const InputTypeCheckBox = styled.input`
  display: none;
  & + label {
    display: block;
    width: 16px;
    height: 16px;
    border: 1px solid var(--line-gray);
    border-radius: 4px;
    float: left;
  }
  &:checked + label {
    background-color: var(--main);
    border-width: 3px;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-direction: row;
`;
export default Checkbox;
