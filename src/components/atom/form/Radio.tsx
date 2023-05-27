import {
  ChangeEvent,
  cloneElement,
  ComponentProps,
  InputHTMLAttributes,
  ReactElement,
  useCallback,
  useState,
} from "react";
import styled from "@emotion/styled";

import { useUID } from "react-uid/dist/es5/hooks";

interface Props
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange" | "name"
  > {
  children: ReactElement<ComponentProps<typeof RadioOption>>[];
}

const Radio = (props: Props) => {
  const { children, ...otherProps } = props;
  const [value, setValue] = useState(props.defaultValue);

  const uncontrolled = props.value == null;
  return (
    <ControlledRadio
      {...otherProps}
      value={uncontrolled ? value : props.value}
      onChange={(event) => {
        props.onChange?.(event);
        if (uncontrolled) {
          setValue(event.target.value);
        }
      }}
    >
      {children}
    </ControlledRadio>
  );
};

const ControlledRadio = ({ children, value, onChange, name }: Props) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
    },
    [onChange]
  );
  const id = useUID();
  return (
    <RadioWrapper>
      {children.map((element, index) => {
        return cloneElement(element, {
          key: index,
          onChange: handleChange,
          checked: value === element.props.value,
          value: element.props.value,
          name: name ?? id,
        });
      })}
    </RadioWrapper>
  );
};

type RadioOptionProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">

const RadioOption = ({
  value,
  name,
  checked,
  onChange,
  children,
  ...others
}: RadioOptionProps) => {
  const id = useUID();
  return (
    <LabelWrapper>
      <input
        type={"radio"}
        className={"visually-none"}
        checked={checked}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        {...others}
      />
      <label htmlFor={id}>{children}</label>
    </LabelWrapper>
  );
};

const LabelWrapper = styled.div`
  width: 100%;

  & label {
    display: flex;
    padding: 10px;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    font-weight: var(--medium);
    color: var(--font-gray);
  }
  & input:checked + label {
    background-color: var(--pure-white);
    color: var(--font-black);
  }
`;

const RadioWrapper = styled.div`
  padding: 4px;
  border-radius: 8px;
  background-color: var(--bg-light);
  display: flex;
  align-items: center;
  justify-content: center;
`;

Radio.Option = RadioOption;
export default Radio;
