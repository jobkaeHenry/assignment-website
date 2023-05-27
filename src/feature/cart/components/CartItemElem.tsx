import styled from "@emotion/styled";
import { CartItemType } from "../types/cartItemsType";
import { Link } from "react-router-dom";
import { itemDescription } from "../../../data/URL/local/user/url";
import { ColumnWrapper, RowWrapper } from "../../../layouts/Wrapper";
import Text from "../../../components/atom/Text";
import InputWithLabel from "./../../../components/atom/form/InputWithLabel";

type Props = {
  data: CartItemType;
};

const CartItemElem = ({ data }: Props) => {
  const { description, _id, image, price, title } = data.itemInfo;

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
          <Text typography="p">{price}</Text>
        </ColumnWrapper>
      </RowWrapper>
      <QuantityCouterWrapper>
        <InputWithLabel
          label="갯수"
          type="number"
          defaultValue={data.quantity}
          inputWidth="100"
        />
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
  width: 100px;
`;

const ImageWrapper = styled.img`
  width: 100px;
  height: 100px;
  background-color: var(--bg-gray)
`;
