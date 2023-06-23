import { useQuery } from "react-query";
import { ItemType } from "../../items/types/itemDataTypes";
import axios from "../../../lib/api/axios";
import { getItemsByPageNum } from "../../../data/URL/server/ItemsRoute";
/**
 * pageNumber를 기반으로 ItemsData를 get 하는 Query
 * @param pageNum
 */
export const useGetItemsByPageNumQuery = (pageNum: number) =>
  useQuery<ItemType[]>(itemsQueryKey.byPageNum(pageNum), async () => {
    const { data } = await axios.get(getItemsByPageNum(pageNum));
    return data;
  });
/**
 * 메인페이지에 있는 최신아이템 리스트 쿼리키
 */
export const itemsQueryKey = {
  all: ["Items"] as const,
  byPageNum: (pageNum: number) => ["Items", pageNum] as const,
};
