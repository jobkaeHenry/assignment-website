import Text from "../../components/atom/Text";
import ErrorMessage from "../../components/atom/lodaing/Error";
import Skeleton from "../../components/atom/lodaing/Skeleton";
import CartItemList from "../../feature/cart/components/CartItemList";
import useSetTitle from "../../hooks/useSetTitle";
import PaddingLayout from "../../layouts/PaddingLayout";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const UserPage = () => {
  useSetTitle("My page");

  return (
    <PaddingLayout>
      <Text typography="h3" bold>
        마이페이지
      </Text>

      <Suspense fallback={<Skeleton />}>
        <ErrorBoundary
          fallback={<ErrorMessage message={"아이템을 불러오지 못했습니다"} />}
        >
          <CartItemList />
        </ErrorBoundary>
      </Suspense>
    </PaddingLayout>
  );
};

export default UserPage;
