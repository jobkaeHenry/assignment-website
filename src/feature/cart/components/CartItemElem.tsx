import { CartItemType } from "../types/cartItemsType";

type Props = {
  data: CartItemType;
};

const CartItemElem = ({ data }: Props) => {
  return <div>{data.quantity}</div>;
};

export default CartItemElem;
