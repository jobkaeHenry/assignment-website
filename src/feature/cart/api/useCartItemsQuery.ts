import { useMutation, useQuery, useQueryClient } from "react-query";
import { CartItemType } from "../types/cartItemsType";
import { axiosPrivate } from "../../../lib/api/axios";
import {
  changeQuantityRoute,
  deleteCartItem,
  getCartItemById,
} from "../../../data/URL/server/cartRoute";
import { AxiosError } from "axios";
import fireToast from "../../../lib/toastify/fireToast";

/**
 * 유저ID를 입력받아 해당유저의 카트 아이템을 불러오는 쿼리
 * @param userId
 */
export const useGetCartItemsByIdQuery = (userId: string | undefined) =>
  useQuery<CartItemType[]>(cartItemsQueryKey.byId(userId), async () => {
    if (userId) {
      const { data } = await axiosPrivate.get(getCartItemById);
      return data;
    }
    return Promise.resolve([]);
  });


/**
 * userId를 입력받아
 * {아이템 id, 수량}를 인자로 Put요청을 수행하는 mutation
 */
export const usePutCartItemQuantity = (userId: string | undefined) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, quantity }: { id: string; quantity: number }) =>
      axiosPrivate.put(changeQuantityRoute(id), { quantity }),
    {
      onMutate: ({ id, quantity }) => {
        // 쿼리 캔슬
        queryClient.cancelQueries(cartItemsQueryKey.byId(userId));
        // 쿼리 스냅샷 생성
        const querySnapshot = queryClient.getQueryData(
          cartItemsQueryKey.byId(userId)
        );
        // 낙관적업데이트
        queryClient.setQueryData<CartItemType[]>(
          cartItemsQueryKey.byId(userId),
          (prev) => {
            const index = (prev ?? []).findIndex((e) => e.itemInfo._id === id);
            (prev ?? [])[index] = { ...(prev ?? [])[index], quantity };
            return prev ?? [];
          }
        );
        return { querySnapshot };
      },
      onError: (
        _err: AxiosError<{ message: string }>,
        _queryFnParams,
        context
      ) => {
        // 이전 값으로 롤백
        queryClient.setQueryData(
          cartItemsQueryKey.byId(userId),
          context?.querySnapshot
        );
        // 클라이언트 에러 메세지 출력
        if (
          _err.response?.status &&
          _err.response?.status >= 400 &&
          _err.response?.status < 500
        ) {
          fireToast("올바르지 않은 값입니다", "error");
        }
        // 서버에서 보내준 에러메시지를 출력
        else
          fireToast(
            _err.response?.data?.message ?? "알 수 없는 에러가 발생했습니다",
            "error"
          );
      },
      onSettled: () => {
        queryClient.invalidateQueries(cartItemsQueryKey.byId(userId));
      },
    }
  );
};

/**
 *userId를 인자로받아
 *아이템 id 를 인자로 delete요청을 수행하는 Mutate
 */
export const useDeleteCartItemQuery = (userId: string | undefined) => {
  const queryClient = useQueryClient();
  return useMutation(
    (itemId: string) => axiosPrivate.delete(deleteCartItem(itemId)),
    {
      onMutate: (itemId: string) => {
        // 쿼리캔슬
        queryClient.cancelQueries(cartItemsQueryKey.byId(userId));
        // 스냅샷 생성
        const querySnapshot = queryClient.getQueryData(
          cartItemsQueryKey.byId(userId)
        );
        // 낙관적 업데이트
        queryClient.setQueryData<CartItemType[]>(
          cartItemsQueryKey.byId(userId),
          (prev) => {
            return (prev ?? []).filter((e) => e.itemInfo._id !== itemId);
          }
        );
        // 스냅샷 리턴
        return { querySnapshot };
      },
      onError: (
        err: AxiosError<{ message: string }>,
        _queryFnParams,
        context
      ) => {
        queryClient.setQueryData(
          cartItemsQueryKey.byId(userId),
          context?.querySnapshot
        );
        // 서버에서 보낸 에러메시지 출력
        fireToast(
          err.response?.data.message ?? "아이템 삭제에 실패했습니다",
          "error"
        );
      },
      onSuccess: () => {
        fireToast("장바구니에서 제거되었습니다", "success");
      },
      onSettled: () => {
        queryClient.invalidateQueries(cartItemsQueryKey.byId(userId));
      },
    }
  );
};

/**
 * cartItems 와 관련된 쿼리키
 */
export const cartItemsQueryKey = {
  all: ["Cartitems"] as const,
  byId: (userId: string | undefined) => ["Cartitems", userId] as const,
};
