import styled from "@emotion/styled";
import React, { InputHTMLAttributes, useId, useState } from "react";
import Text from "../../atom/Text";
import SearchIcon from '../../../assets/icons/searchIcon.svg'
interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

const FileInput = React.forwardRef(
  (props: Props, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { label, onChange, ...others } = props;
    const id = useId();

    const [hasFile, setHasfile] = useState<string | ArrayBuffer | null>(null);
    const [fileTitle, setFileTitle] = useState<string | undefined>();

    const saveImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const file = e.target.files[0];
        const reader = new FileReader();
        setFileTitle(file.name);
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setHasfile(reader.result);
        };
      }
    };

    return (
      <Label htmlFor={props.id ? props.id : id}>
        <Text typography="h4">{hasFile ? fileTitle : label}</Text>
        {!hasFile ? <ImageIcon url={SearchIcon} /> : <ImageIcon url={hasFile} />}
        <InputTypeFile
          onChange={(e) => {
            saveImgFile(e);
            onChange && onChange(e);
          }}
          ref={ref}
          type={"file"}
          accept="image/*"
          id={props.id ? props.id : id}
          {...others}
        />
      </Label>
    );
  }
);
const ImageIcon = styled.div`
  width: 200px;
  height: 200px;
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
  flex-direction: column;
`;
export default FileInput;
