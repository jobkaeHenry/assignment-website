import ItemDetail from "../../feature/items/components/ItemDetail";
import MobileWrapper from "../../layouts/MobileWrapper";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Skeleton from "../../components/atom/lodaing/Skeleton";
import ErrorMessage from "../../components/atom/lodaing/Error";
import ItemsList from "../../feature/main/components/ItemsList";
import Text from "../../components/atom/Text";
import Divider from "../../components/atom/DIvider";

const ItemDetailPage = () => {
  return (
    <div>
      <MobileWrapper>
        <Suspense>
          <ItemDetail />
        </Suspense>
        <Divider/>
        <Text typography="h3" bold>
          최신 상품 보기
        </Text>
        <Suspense fallback={<Skeleton />}>
          <ErrorBoundary
            fallback={<ErrorMessage message={"상품을 불러오지 못했습니다"} />}
          >
            <ItemsList></ItemsList>
          </ErrorBoundary>
        </Suspense>
      </MobileWrapper>
    </div>
  );
};

export default ItemDetailPage;
