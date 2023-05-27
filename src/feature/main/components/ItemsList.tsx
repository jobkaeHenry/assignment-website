import { useQuery } from "react-query";
import axios from "../../../lib/api/axios";
import { getItemsByPageNum } from "../../../data/URL/server/ItemsRoute";
import { ItemType } from "../../items/types/itemDataTypes";
import ItemCard from "./Items/ItemCard";
import PaddingLayout from "../../../layouts/PaddingLayout";

import { NotifyMessage } from "../../../components/atom/lodaing/Error";

interface Props {
  pageNum?: number;
}

const ItemsList = ({ pageNum = 1 }: Props) => {
  const { data } = useQuery<ItemType[]>(["items", pageNum], () =>
    axios.get(getItemsByPageNum(pageNum)).then(({ data }) => data)
  );

  return (
    <PaddingLayout>
      {data?.length !== 0 ? (
        data?.map((e) => <ItemCard data={e} key={e.id}></ItemCard>)
      ) : (
        <NotifyMessage message="등록된 아이템이 없습니다" />
      )}
    </PaddingLayout>
  );
};

export default ItemsList;
