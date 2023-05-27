import Skeleton from "../../../components/atom/lodaing/Skeleton";
import { ColumnWrapper, RowWrapper } from "../../../layouts/Wrapper";
import { CartItemWrapper, QuantityCouterWrapper } from "./CartItemElem";

const CartItemSkeleton = ({ number = 5 }) => {
  const EmptyArr = Array.from(new Array(number), () => "");
  return (
    <>
      {EmptyArr.map((_e, i) => {
        return (
          <CartItemWrapper key={i}>
            <RowWrapper>
              <Skeleton width="100px" height="100px"></Skeleton>

              <ColumnWrapper>
                <Skeleton width="200px" height="20px"></Skeleton>
                <Skeleton width="200px" height="16px"></Skeleton>
                <Skeleton width="200px" height="16px"></Skeleton>
              </ColumnWrapper>
            </RowWrapper>
            <QuantityCouterWrapper>
              <Skeleton width="150px" height="100%"></Skeleton>
            </QuantityCouterWrapper>
          </CartItemWrapper>
        );
      })}
    </>
  );
};

export default CartItemSkeleton;
