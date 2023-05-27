import { useQuery } from "react-query";
import { ItemType } from "../../items/types/itemDataTypes";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { getCartItemById } from "../../../data/URL/server/cartRoute";
import CartItemElem from "./CartItemElem";
import { NotifyMessage } from "../../../components/atom/lodaing/Error";
import { CartItemType } from "../types/cartItemsType";

const CartItemList = () => {
  const axiosPrivate = useAxiosPrivate();

  const { data } = useQuery<CartItemType[]>(["Cartitems"], () =>
    axiosPrivate.get(getCartItemById).then(({ data }) => data)
  );
  console.log(data);
  return (
    <div>
      {data?.length !== 0 ? (
        data?.map((cartItem) => (
          <CartItemElem data={cartItem} key={cartItem.itemInfo.id} />
        ))
      ) : (
        <NotifyMessage message="장바구니가 비었습니다"></NotifyMessage>
      )}
    </div>
  );
};

export default CartItemList;
