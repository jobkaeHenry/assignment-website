import ItemCard from "./Items/ItemCard";
import PaddingLayout from "../../../layouts/PaddingLayout";

import { NotifyMessage } from "../../../components/atom/lodaing/Error";
import { css } from "@emotion/react";
import { useGetItemsByPageNumQuery } from "../api/useItemsQuery";

interface Props {
  pageNum?: number;
}

const ItemsList = ({ pageNum = 1 }: Props) => {
  const { data } = useGetItemsByPageNumQuery(pageNum);

  return (
    <PaddingLayout flexDirection="row" css={overFlowX}>
      {data?.length !== 0 ? (
        data?.map((e) => <ItemCard data={e} key={e.id}></ItemCard>)
      ) : (
        <NotifyMessage message="등록된 아이템이 없습니다" />
      )}
    </PaddingLayout>
  );
};

const overFlowX = css`
  overflow-y: auto;
`;

export default ItemsList;
