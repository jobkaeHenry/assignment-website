import styled from "@emotion/styled";
import React, { InputHTMLAttributes, useId, useState } from "react";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

const FileInput = (props: Props) => {
  const { label, onChange, ...others } = props;
  const id = useId();

  const [hasFile, setHasfile] = useState<string | ArrayBuffer | null>(null);

  const saveImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setHasfile(reader.result);
      };
    }
  };

  return (
    <Label htmlFor={props.id ? props.id : id}>
      {hasFile && <ImageIcon url={hasFile} />}
      <InputTypeFile
        onChange={(e) => {
          saveImgFile(e);
          onChange && onChange(e);
        }}
        type={"file"}
        accept="image/*"
        id={props.id ? props.id : id}
        {...others}
      />
      {label}
    </Label>
  );
};
const ImageIcon = styled.div`
  width: 48px;
  height: 48px;
  background-size: cover;
  border-radius: 4px;
  border: 1px solid var(--line-gray);
  background-image: ${(props: { url: string | ArrayBuffer }) =>
    props.url ? `url(${props.url})` : ""};
`;
const InputTypeFile = styled.input`
  display: none;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-direction: row;
`;
export default FileInput;
