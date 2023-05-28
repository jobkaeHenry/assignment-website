import Skeleton from "../../../components/atom/lodaing/Skeleton";
import { ColumnWrapper, RowWrapper } from "../../../layouts/Wrapper";
import { CartItemWrapper, QuantityCouterWrapper } from "./CartItemElem";
import { ItemListWrapper } from "./CartItemList";
import { useEffect, useState } from "react";

const CartItemSkeleton = ({ number = 3 }) => {
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsShow(true);
    }, 200);
  }, []);

  const EmptyArr = Array.from(new Array(number), () => "");
  return isShow ? (
    <ItemListWrapper>
      <Skeleton width="70px" height="24px" />
      {EmptyArr.map((_e, i) => {
        return (
          <CartItemWrapper key={i}>
            <RowWrapper>
              <Skeleton width="100px" height="100px" />
              <ColumnWrapper>
                <Skeleton width="200px" height="20px" />
                <Skeleton width="200px" height="16px" />
                <Skeleton width="200px" height="16px" />
              </ColumnWrapper>
            </RowWrapper>
            <QuantityCouterWrapper>
              <Skeleton width="150px" height="20px" />
            </QuantityCouterWrapper>
          </CartItemWrapper>
        );
      })}
    </ItemListWrapper>
  ) : (
    <></>
  );
};

export default CartItemSkeleton;
