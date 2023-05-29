import styled from "@emotion/styled";
import { CartItemType } from "../types/cartItemsType";
import { Link } from "react-router-dom";
import { itemDescription } from "../../../data/URL/local/user/url";
import { ColumnWrapper, RowWrapper } from "../../../layouts/Wrapper";
import Text from "../../../components/atom/Text";
import InputWithLabel from "./../../../components/atom/form/InputWithLabel";
import { useMutation, useQueryClient } from "react-query";
import { axiosPrivate } from "../../../lib/api/axios";
import { deleteCartItem } from "../../../data/URL/server/cartRoute";
import { userInfoAtom } from "../../../context/recoil/atom/user";
import { useRecoilValue } from "recoil";
import fireToast from "../../../lib/toastify/fireToast";

type Props = {
  data: CartItemType;
};

const CartItemElem = ({ data }: Props) => {
  const { description, _id, image, price, title } = data.itemInfo;
  const queryClient = useQueryClient();
  const { userId } = useRecoilValue(userInfoAtom);
  const previousData = queryClient.getQueriesData([
    "Cartitems",
    userId,
  ])[0][1] as CartItemType[];
  const { mutate } = useMutation(
    (id: string) => axiosPrivate.delete(deleteCartItem(id)),
    {
      onMutate: () => {
        queryClient.setQueryData(["Cartitems", userId], () =>
          previousData.filter((e) => e.itemInfo._id !== _id)
        );
      },
      onError: () => {
        queryClient.setQueryData(["Cartitems", userId], () => previousData);
        fireToast('아이템 삭제에 실패했습니다', 'error')
      },
      onSuccess:()=>{
        fireToast('장바구니에서 제거되었습니다','success')
      }
    }
  );

  return (
    <CartItemWrapper>
      <RowWrapper>
        <Link to={itemDescription(_id)}>
          <ImageWrapper src={image}></ImageWrapper>
        </Link>
        <ColumnWrapper>
          <Text typography="h3" bold>
            {`[${title}]`}
          </Text>
          <Text typography="p">{description}</Text>
          <Text typography="p">{price.toLocaleString()}</Text>
        </ColumnWrapper>
      </RowWrapper>
      <QuantityCouterWrapper>
        <InputWithLabel
          label="갯수"
          type="number"
          defaultValue={data.quantity}
          inputWidth="100"
        />
        <DeleteButton onClick={() => mutate(_id)}>삭제</DeleteButton>
      </QuantityCouterWrapper>
    </CartItemWrapper>
  );
};

export default CartItemElem;

export const CartItemWrapper = styled.div`
  width: 100%;
  height: 130px;
  border-bottom: 1px solid var(--line-gray);
  display: flex;
  align-items: center;
  padding: 16px;
  justify-content: space-between;
`;

export const QuantityCouterWrapper = styled.div`
  width: 130px;
  display: flex;
  flex-direction: row;
`;

export const ImageWrapper = styled.img`
  width: 100px;
  height: 100px;
  background-color: var(--bg-gray);
  object-fit: cover;
`;

export const DeleteButton = styled.button`
  width: 64px;
  height: 36px;
  padding: 8px;
  box-sizing: border-box;
  background-color: var(--alert-red);
  color: var(--pure-white);
  align-self: center;
`;
