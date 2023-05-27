import { useQuery } from "react-query";
import { getCartItemById } from "../../../data/URL/server/cartRoute";
import CartItemElem from "./CartItemElem";
import { NotifyMessage } from "../../../components/atom/lodaing/Error";
import { CartItemType } from "../types/cartItemsType";
import { axiosPrivate } from "../../../lib/api/axios";

const CartItemList = () => {
  const { data } = useQuery<CartItemType[]>(["Cartitems"], () =>
    axiosPrivate.get(getCartItemById).then(({ data }) => data)
  );

  return (
    <div>
      {data!.length !== 0 ? (
        data!.map((cartItem, i) => (
          <CartItemElem data={cartItem} key={cartItem.itemInfo._id + i} />
        ))
      ) : (
        <NotifyMessage message="장바구니가 비었습니다"></NotifyMessage>
      )}
    </div>
  );
};

export default CartItemList;
