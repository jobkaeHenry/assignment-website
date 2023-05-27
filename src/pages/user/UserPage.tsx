import { useRecoilValue } from "recoil";
import ErrorMessage from "../../components/atom/lodaing/Error";
import Skeleton from "../../components/atom/lodaing/Skeleton";
import CartItemList from "../../feature/cart/components/CartItemList";
import useSetTitle from "../../hooks/useSetTitle";
import PaddingLayout from "../../layouts/PaddingLayout";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import DashBoard from "../../feature/user/components/DashBoard";
import { RowWrapper } from "./../../layouts/Wrapper";
import { userInfoAtom } from "../../context/recoil/atom/user";
import SellingItemList from "../../feature/cart/components/SellingItemList";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UserPage = () => {
  useSetTitle("My page");
  useAxiosPrivate();
  const { isSellerNow } = useRecoilValue(userInfoAtom);
  return (
    <PaddingLayout>
      <RowWrapper>
        <DashBoard />
        {!isSellerNow && (
          <Suspense fallback={<Skeleton />}>
            <ErrorBoundary
              fallback={
                <ErrorMessage message={"아이템을 불러오지 못했습니다"} />
              }
            >
              <CartItemList />
            </ErrorBoundary>
          </Suspense>
        )}
        {isSellerNow && (
          <Suspense fallback={<Skeleton />}>
            <ErrorBoundary
              fallback={
                <ErrorMessage message={"아이템을 불러오지 못했습니다"} />
              }
            >
              <SellingItemList />
            </ErrorBoundary>
          </Suspense>
        )}
      </RowWrapper>
    </PaddingLayout>
  );
};

export default UserPage;
