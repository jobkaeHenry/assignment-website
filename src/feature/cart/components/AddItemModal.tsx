import styled from "@emotion/styled";
import InputWithLabel from "../../../components/atom/form/InputWithLabel";
import TextArea from "../../../components/atom/form/TextArea";
import Text from "../../../components/atom/Text";
import { useForm } from "react-hook-form";
import { Button } from "./../../../components/atom/form/Button";
import { axiosPrivate } from "../../../lib/api/axios";
import { createItemUrlRoute } from "../../../data/URL/server/ItemsRoute";
import { useMutation, useQueryClient } from "react-query";
import { userInfoAtom } from "../../../context/recoil/atom/user";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isModalOpenAtom } from "../../../context/recoil/atom/globalModalAtom";
import fireToast from "../../../lib/toastify/fireToast";
import { getLS, setLS } from "./../../../utils/localStorage";
import { useEffect, useState } from "react";
import FileInput from "../../../components/atom/form/FileInput";
import { ColumnWrapper } from "../../../layouts/Wrapper";

interface NewItemFormValue {
  title: string;
  description: string;
  price: string;
  image: FileList;
}

const AddItemModal = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<NewItemFormValue>();
  const queryClient = useQueryClient();
  const { userId } = useRecoilValue(userInfoAtom);
  const setOpenModal = useSetRecoilState(isModalOpenAtom);
  const [savedAddingItem, _] = useState(
    getLS<NewItemFormValue>("savedAddingItem") || undefined
  );
  useEffect(() => {
    const handleChange = () => {
      const formValue = watch(["price", "description", "title"]); // 현재 값 가져오기
      setLS("savedAddingItem", formValue); // 로컬 스토리지에 저장하기
    };

    watch(handleChange); // 값이 변할 때마다 handleChange 함수 실행
  }, [watch]);

  const { mutate: submitFunction } = useMutation(
    (data:FormData) => {

      return axiosPrivate.post(createItemUrlRoute, data,{headers:{"Content-Type":'multipart/form-data'}});
    },
    {
      onError: () => {
        fireToast("아이템 추가에 실패했습니다", "error");
        setOpenModal(true);
      },
      onSuccess: () => {
        fireToast("상품이 추가됬습니다", "success");
        queryClient.invalidateQueries({
          queryKey: ["Items"],
          refetchInactive: true,
        });
        queryClient.invalidateQueries({
          queryKey: ["AllItems"],
          refetchInactive: true,
        });
        queryClient.invalidateQueries({
          queryKey: ["SellingItems", userId],
          refetchInactive: true,
        });
        setOpenModal(false);
        setLS("savedAddingItem", null);
      },
    }
  );

  return (
    <FormWrapper
      onSubmit={handleSubmit((data) => {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        const values = Object.entries(getValues());
        values.forEach(([key, value]) => {
          if (key !== "image") {
            formData.append(key, value);
          }
        });
        console.log(formData)
        submitFunction(formData);
      })}
    >
      <FileInput
        label="이미지를 추가해주세요"
        placeholder="상품명을 입력해주세요"
        defaultValue={savedAddingItem?.title}
        {...register("image", {
          required: true,
          validate: (value) => {
            const file = value[0];
            if (!file) {
              return "파일을 선택하세요.";
            }
            if (!file.type.includes("image")) {
              return "이미지 파일만 허용됩니다.";
            }
            if (file.size > 5 * 1024 * 1024) {
              return "파일 크기는 10MB 이하로 제한됩니다.";
            }
            return true;
          },
        })}
      />
      <ColumnWrapper>
        <InputWithLabel
          label="상품명"
          inputWidth="100%"
          placeholder="상품명을 입력해주세요"
          defaultValue={savedAddingItem?.title}
          error={errors.title ? true : false}
          {...register("title", { required: true, minLength: 3 })}
        />
        <InputWithLabel
          label="가격"
          type="number"
          inputWidth="100%"
          placeholder="가격을 입력해주세요"
          defaultValue={savedAddingItem?.price}
          unit="원"
          error={errors.price ? true : false}
          {...register("price", {
            required: true,
            min: 1000,
            valueAsNumber: true,
          })}
        />
        <Text typography="h4">상세설명</Text>
        <TextArea
          height={"250px"}
          defaultValue={savedAddingItem?.description}
          error={errors.description ? true : false}
          {...register("description", { required: true, minLength: 10 })}
        />
        <Button type="submit">작성완료</Button>
      </ColumnWrapper>
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
  display: flex;
  min-width: 340px;
  flex-direction: column;
  gap: 8px;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

export default AddItemModal;
