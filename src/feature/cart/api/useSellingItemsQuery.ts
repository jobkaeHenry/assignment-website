import { useMutation, useQuery, useQueryClient } from "react-query";
import axios, { axiosPrivate } from "../../../lib/api/axios";
import {
  createItemUrlRoute,
  deleteItemRoute,
  getItemsByUserId,
} from "../../../data/URL/server/ItemsRoute";
import { ItemType } from "../../items/types/itemDataTypes";
import fireToast from "../../../lib/toastify/fireToast";
import { AxiosError } from "axios";
import { allItemsQueryKey } from "../../main/api/useAllItemsQuery";
import { setLS } from "../../../utils/localStorage";
import { useSetRecoilState } from "recoil";
import { isModalOpenAtom } from "../../../context/recoil/atom/globalModalAtom";
import { itemsQueryKey } from "../../main/api/useItemsQuery";

/**
 *userId를 인자로받아
 *해당 유저의 판매중인 상품정보를 get하는 query
 */
export const useGetSellingItemQuery = (userId: string | undefined) =>
  useQuery<ItemType[]>(sellingItemsQueryKey.byId(userId), async () => {
    if (userId) {
      const { data } = await axios.get(getItemsByUserId(userId));
      return data;
    } else return Promise.resolve([]);
  });

/**
 *userId를 인자로받아
 *아이템 id 를 인자로 delete요청을 수행하는 Mutate를 Return 하는 훅
 */
export const useDeleteSellingItemQuery = (userId: string | undefined) => {
  const queryClient = useQueryClient();
  return useMutation(
    (itemId: string) => axiosPrivate.delete(deleteItemRoute(itemId)),
    {
      onMutate: (itemId: string) => {
        queryClient.cancelQueries(sellingItemsQueryKey.byId(userId));
        const querySnapshot = queryClient.getQueryData<ItemType[]>([
          "SellingItems",
          userId,
        ]);
        queryClient.setQueryData<ItemType[]>(
          sellingItemsQueryKey.byId(userId),
          () => (querySnapshot ?? []).filter((e) => e.id !== itemId)
        );
        return { querySnapshot };
      },
      onSuccess: () => {
        fireToast("삭제에 성공했습니다", "success");

        queryClient.invalidateQueries({
          queryKey:itemsQueryKey.all,
          refetchInactive: true,
        });
        queryClient.invalidateQueries({
          queryKey: allItemsQueryKey.all,
          refetchInactive: true,
        });
      },
      onError: (
        err: AxiosError<{ message: string }>,
        _queryFnParams,
        context
      ) => {
        queryClient.setQueryData(
          sellingItemsQueryKey.byId(userId),
          context?.querySnapshot
        );
        fireToast(err.response?.data.message ?? "삭제에 실패했습니다", "error");
      },
    }
  );
};
/**
 * userId 를 입력 받아
 * formData를 인자로 새로운 상품을 추가하는 mutate를 리턴하는 훅스
 * @param userId
 * @returns
 */
export const usePostSellingItemQuery = (userId: string | undefined) => {
  const queryClient = useQueryClient();
  const setOpenModal = useSetRecoilState(isModalOpenAtom);
  return useMutation(
    (data: FormData) => {
      if (userId) {
        return axiosPrivate.post(createItemUrlRoute, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else return Promise.reject("id가 입력되지않았습니다");
    },
    {
      onError: () => {
        fireToast("아이템 추가에 실패했습니다", "error");
        setOpenModal(true);
      },
      onSuccess: () => {
        fireToast("상품이 추가됬습니다", "success");
        queryClient.invalidateQueries({
          queryKey: itemsQueryKey.all,
          refetchInactive: true,
        });
        queryClient.invalidateQueries({
          queryKey: allItemsQueryKey.all,
          refetchInactive: true,
        });
        queryClient.invalidateQueries({
          queryKey: sellingItemsQueryKey.byId(userId),
          refetchInactive: true,
        });
        setOpenModal(false);
        setLS("savedAddingItem", null);
      },
    }
  );
};

export const sellingItemsQueryKey = {
  all: ["SellingItems"] as const,
  byId: (userId: string | undefined) => ["SellingItems", userId] as const,
};
