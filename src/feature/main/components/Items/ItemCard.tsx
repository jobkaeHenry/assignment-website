import { useMutation, useQueryClient } from "react-query";
import Text from "../../../../components/atom/Text";
import { ItemType } from "../../../items/types/itemDataTypes";
import styled from "@emotion/styled";
import { addToCartRoute } from "../../../../data/URL/server/cartRoute";

import { useState } from "react";
import { LoadingSpinner } from "../../../../components/atom/lodaing/Spinner";
import { axiosPrivate } from "../../../../lib/api/axios";
import { userInfoAtom } from "../../../../context/recoil/atom/user";
import { useRecoilValue } from "recoil";
import { AxiosError } from "axios";

type Props = {
  data: ItemType;
};

const ItemCard = ({ data }: Props) => {
  const [isProceeding, setIsProceeding] = useState(false);
  const { userId } = useRecoilValue(userInfoAtom);
  const { description, id, image, price, title } = data;
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (id: string) => axiosPrivate.post(addToCartRoute, { itemId: id }),
    {
      onMutate: () => {
        setIsProceeding(true);
      },
      onSuccess: () => {
        // 토스트 팝업해야함
        setIsProceeding(false);
        queryClient.invalidateQueries({
          queryKey: ["Cartitems", userId],
          refetchInactive: true,
        });
      },
      onError: (error:AxiosError) => {
        if(error.response?.status===400){
          setIsProceeding(false);
          alert('이미 추가된 아이템입니다')
        }
      },
    }
  );

  return (
    <CardWrapper>
      <ImageWrapper>
        <AddToCartBtn
          role="button"
          title="장바구니에 추가"
          onClick={() => {
            if (!isProceeding) mutate(id);
          }}
        >
          {isProceeding ? <LoadingSpinner size={24} /> : "+"}
        </AddToCartBtn>
        <img src={image} alt={title} />
      </ImageWrapper>
      <Text typography={"h4"} weight="var(--medium)">
        {title}
      </Text>
      <Text typography={"h4"} color="var(--font-gray)">
        {price.toLocaleString() + "원"}
      </Text>
      <Text typography={"sub"} weight="var(--medium)">
        {description}
      </Text>
    </CardWrapper>
  );
};

export default ItemCard;

const ImageWrapper = styled.div`
  position: relative;
  width: 240px;
  height: 240px;
  background-color: var(--bg-gray);
  & > img {
    width: 240px;
    height: 240px;
    object-fit: cover;
  }
`;

const CardWrapper = styled.div`
  width: 260px;
  height: 400px;
  padding: 16px;
  display: flex;
  gap: 4px;
  flex-direction: column;
`;

const AddToCartBtn = styled.button`
  width: 36px;
  height: 36px;
  font-size: var(--h3);
  background-color: var(--pure-white);
  color: var(--sub-color);
  border: 1px solid var(--line-gray);
  position: absolute;
  top: 4px;
  right: 4px;
  border-radius: 50%;
  padding-bottom: 2px;
`;
