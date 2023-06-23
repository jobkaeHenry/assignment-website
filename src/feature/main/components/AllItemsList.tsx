import PaddingLayout from "../../../layouts/PaddingLayout";
import ItemCard from "./Items/ItemCard";
import { NotifyMessage } from "../../../components/atom/lodaing/Error";
import { css } from "@emotion/react";
import { useGetAllItemsQuery } from "../api/useAllItemsQuery";

const AllItemsList = () => {
  const { data } = useGetAllItemsQuery();

  return (
    <PaddingLayout css={FlexWrap}>
      {data?.length !== 0 ? (
        data?.map((e) => <ItemCard data={e} key={e.id}></ItemCard>)
      ) : (
        <NotifyMessage message="등록된 아이템이 없습니다" />
      )}
    </PaddingLayout>
  );
};
const FlexWrap = css`
  flex-wrap: wrap;
  flex-direction: row;
`;

export default AllItemsList;
