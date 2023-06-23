import { useQuery } from "react-query";
import { ItemType } from "../../items/types/itemDataTypes";
import axios from "../../../lib/api/axios";
import { getAllItemsRoute } from "../../../data/URL/server/ItemsRoute";
/**
 * 모든 아이템 리스트를 서버로부터 get하는 쿼리
 *
 */
export const useGetAllItemsQuery = () =>
  useQuery<ItemType[]>(allItemsQueryKey.all, async () => {
    const { data } = await axios.get(getAllItemsRoute);
    return data;
  });
/**
 * 메인페이지에 있는 모든아이템 리스트 쿼리키
 */
export const allItemsQueryKey = {
  all: ["AllItems"] as const,
};
