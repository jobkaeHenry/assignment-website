import styled from "@emotion/styled";
import { CartItemType } from "../types/cartItemsType";
import { Link } from "react-router-dom";
import { itemDescription } from "../../../data/URL/local/user/url";
import { ColumnWrapper, RowWrapper } from "../../../layouts/Wrapper";
import Text from "../../../components/atom/Text";
import InputWithLabel from "./../../../components/atom/form/InputWithLabel";
import { userInfoAtom } from "../../../context/recoil/atom/user";
import { useRecoilValue } from "recoil";
import useDebounce from "../../../hooks/useDebounce";
import { useEffect, useState } from "react";
import {
  useDeleteCartItemQuery,
  usePutCartItemQuantity,
} from "../api/useCartItemsQuery";

type Props = {
  data: CartItemType;
};

const CartItemElem = ({ data }: Props) => {
  const { description, _id, image, price, title } = data.itemInfo;

  const { userId } = useRecoilValue(userInfoAtom);
  const [currentQuantity, setCurrentQuantity] = useState(data.quantity);
  const debouncedQuantity = useDebounce(currentQuantity, 300);

  const { mutate: changeQuantity } = usePutCartItemQuantity(userId);
  useEffect(() => {
    changeQuantity({ id: _id, quantity: Number(debouncedQuantity) });
  }, [_id, changeQuantity, debouncedQuantity]);

  const { mutate: removeItem } = useDeleteCartItemQuery(userId);

  return (
    <CartItemWrapper>
      <RowWrapper>
        <Link to={itemDescription(_id)}>
          <ImageWrapper src={image}></ImageWrapper>
        </Link>
        <ColumnWrapper>
          <Text typography="h3" bold className="text-overflow-hidden">
            {`[${title}]`}
          </Text>
          <Text typography="p" className="text-overflow-hidden">
            {description}
          </Text>
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
