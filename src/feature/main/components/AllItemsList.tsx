import PaddingLayout from "../../../layouts/PaddingLayout";
import axios from "axios";
import { getAllItemsRoute } from "../../../data/URL/server/ItemsRoute";
import { useQuery } from "react-query";
import { ItemType } from "../../items/types/itemDataTypes";
import ItemCard from "./Items/ItemCard";
import { NotifyMessage } from "../../../components/atom/lodaing/Error";
import { css } from "@emotion/react";

const AllItemsList = () => {
  const { data } = useQuery<ItemType[]>(["AllItems"], () =>
    axios.get(getAllItemsRoute).then(({ data }) => data)
  );

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
