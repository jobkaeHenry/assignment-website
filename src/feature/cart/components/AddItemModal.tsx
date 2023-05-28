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
import { ItemType } from "../../items/types/itemDataTypes";
import { isModalOpenAtom } from "../../../context/recoil/atom/globalModalAtom";

interface NewItemFormValue {
  title: string;
  description: string;
  price: string;
  image: string;
}

const AddItemModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewItemFormValue>();
  const queryClient = useQueryClient();
  const { userId } = useRecoilValue(userInfoAtom);
  const setOpenModal=  useSetRecoilState(isModalOpenAtom)

  const previousData = queryClient.getQueriesData([
    "SellingItems",
    userId,
  ])[0][1] as ItemType[];

  const { mutate } = useMutation(
    (data: NewItemFormValue) => {
      return axiosPrivate.post(createItemUrlRoute, {
        ...data,
        image: "https://d2kchovjbwl1tk.cloudfront.net/vendor/19/product/Brown_1676186065453_resized512-jpg.webp",
      });
    },
    {
      onMutate: (data) => {
        queryClient.setQueryData(["SellingItems", userId], () => [
          ...previousData,
          { ...data, image: "https://d2kchovjbwl1tk.cloudfront.net/vendor/19/product/Brown_1676186065453_resized512-jpg.webp", seller: userId },
        ]);
        setOpenModal(false)
      },
      onError: () => {
        queryClient.setQueryData(["SellingItems", userId], () => previousData);
        setOpenModal(true)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["Items"],
          refetchInactive: true,
        });
        queryClient.invalidateQueries({
          queryKey: ["AllItems"],
          refetchInactive: true,
        });
        queryClient.invalidateQueries({
          queryKey: ["SellingItems",userId],
          refetchInactive: true,
        });
      },
    }
  );

  return (
    <FormWrapper onSubmit={handleSubmit((data) => mutate(data))}>
      <InputWithLabel
        label="상품명"
        inputWidth="100%"
        placeholder="상품명을 입력해주세요"
        error={errors.title ? true : false}
        {...register("title", { required: true, minLength: 3 })}
      />
      <InputWithLabel
        label="가격"
        type="number"
        inputWidth="100%"
        placeholder="가격을 입력해주세요"
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
        error={errors.description ? true : false}
        {...register("description", { required: true, minLength: 10 })}
      />
      <Button type="submit">작성완료</Button>
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
  display: flex;
  min-width: 340px;
  flex-direction: column;
  gap: 8px;
`;

export default AddItemModal;
