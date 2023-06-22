import styled from "@emotion/styled";
import { CartItemType } from "../types/cartItemsType";
import { Link } from "react-router-dom";
import { itemDescription } from "../../../data/URL/local/user/url";
import { ColumnWrapper, RowWrapper } from "../../../layouts/Wrapper";
import Text from "../../../components/atom/Text";
import InputWithLabel from "./../../../components/atom/form/InputWithLabel";
import { useMutation, useQueryClient } from "react-query";
import { axiosPrivate } from "../../../lib/api/axios";
import {
  changeQuantityRoute,
  deleteCartItem,
} from "../../../data/URL/server/cartRoute";
import { userInfoAtom } from "../../../context/recoil/atom/user";
import { useRecoilValue } from "recoil";
import fireToast from "../../../lib/toastify/fireToast";
import { AxiosError } from "axios";
import useDebounce from "../../../hooks/useDebounce";
import { useEffect, useState } from "react";

type Props = {
  data: CartItemType;
};

const CartItemElem = ({ data }: Props) => {
  const { description, _id, image, price, title } = data.itemInfo;
  const queryClient = useQueryClient();
  const { userId } = useRecoilValue(userInfoAtom);
  const [currentQuantity, setCurrentQuantity] = useState(data.quantity);
  const debouncedQuantity = useDebounce(currentQuantity, 300);
  const { mutate: changeQuantity } = useMutation(
    ({ id, quantity }: { id: string; quantity: number }) =>
      axiosPrivate.put(changeQuantityRoute(id), { quantity }),
    {
      onMutate: ({ id, quantity }) => {
        queryClient.cancelQueries(["Cartitems", userId]);
        const querySnapshot = queryClient.getQueryData(["Cartitems", userId]);
        // let copyedArr: CartItemType[];
        // if (Array.isArray(querySnapshot)) {
        //   copyedArr = JSON.parse(JSON.stringify(querySnapshot));
        // }
        queryClient.setQueryData<CartItemType[]>(
          ["Cartitems", userId],
          (prev) => {
            const index = (prev ?? []).findIndex((e) => e.itemInfo._id === id);
            (prev ?? [])[index] = { ...(prev ?? [])[index], quantity };
            return prev ?? [];
          }
        );
        return { querySnapshot };
      },
      onError: (_err: AxiosError, _queryFnParams, context) => {
        queryClient.setQueryData(["Cartitems", userId], context?.querySnapshot);
        if (
          _err.response?.status &&
          _err.response?.status >= 400 &&
          _err.response?.status < 500
        ) {
          fireToast("올바르지 않은 값입니다", "error");
        } else fireToast("알 수 없는 오류가 발생했습니다", "error");
      },
      onSettled: () => {
        queryClient.invalidateQueries(["Cartitems", userId]);
      },
    }
  );
  useEffect(() => {
    changeQuantity({ id: _id, quantity: Number(debouncedQuantity) });
  }, [_id, changeQuantity, debouncedQuantity]);

  const { mutate: removeItem } = useMutation(
    (id: string) => axiosPrivate.delete(deleteCartItem(id)),
    {
      onMutate: () => {
        queryClient.cancelQueries(["Cartitems", userId]);
        const querySnapshot = queryClient.getQueryData(["Cartitems", userId]);
        queryClient.setQueryData<CartItemType[]>(
          ["Cartitems", userId],
          (prev) => {
            return (prev ?? []).filter((e) => e.itemInfo._id !== _id);
          }
        );
        return { querySnapshot };
      },
      onError: (_err, _queryFnParams, context) => {
        queryClient.setQueryData(["Cartitems", userId], context?.querySnapshot);
        fireToast("아이템 삭제에 실패했습니다", "error");
      },
      onSuccess: () => {
        fireToast("장바구니에서 제거되었습니다", "success");
      },
      onSettled: () => {
        queryClient.invalidateQueries(["Cartitems", userId]);
      },
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
          value={currentQuantity}
          min={1}
          inputWidth="100"
          onChange={(e) => {
            if (Number(e.target.value) > 0) {
              setCurrentQuantity(Number(parseInt(e.target.value)));
            }
          }}
        />
        <DeleteButton onClick={() => removeItem(_id)}>삭제</DeleteButton>
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
