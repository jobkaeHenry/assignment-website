import { ErrorBoundary } from "react-error-boundary";
import Skeleton from "../../components/atom/lodaing/Skeleton";
import ItemsList from "../../feature/main/components/ItemsList";
import MainCarousel from "../../feature/main/components/MainCarousel";
import useSetTitle from "../../hooks/useSetTitle";
import { Suspense } from "react";
import ErrorMessage from "../../components/atom/lodaing/Error";
import PaddingLayout from "./../../layouts/PaddingLayout";
import Text from "../../components/atom/Text";

const Main = () => {
  useSetTitle("Assignment");

  return (
    <>
      <MainCarousel />
      <PaddingLayout>
        <Text typography="h3" bold>
          최신 아이템
        </Text>
      </PaddingLayout>
      <Suspense fallback={<Skeleton />}>
        <ErrorBoundary
          fallback={<ErrorMessage message={"상품을 불러오지 못했습니다"} />}
        >
          <ItemsList></ItemsList>
        </ErrorBoundary>
      </Suspense>
    </>
  );
};

export default Main;
