import { useMutation, useQueryClient } from "react-query";
import { axiosPrivate } from "../../../../lib/api/axios";
import { useRecoilValue } from "recoil";
import { userInfoAtom } from "../../../../context/recoil/atom/user";
import { useState } from "react";
import { addToCartRoute } from "../../../../data/URL/server/cartRoute";
import { AxiosError } from "axios";
import fireToast from "../../../../lib/toastify/fireToast";

export const useAddToCart = () => {
  const [isProceeding, setIsProceeding] = useState(false);
  const { userId } = useRecoilValue(userInfoAtom);

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (id: string) => axiosPrivate.post(addToCartRoute, { itemId: id }),
    {
      onMutate: () => {
        setIsProceeding(true);
      },
      onSuccess: () => {
        fireToast('장바구니에 추가됬습니다','success')
        setIsProceeding(false);
        queryClient.invalidateQueries({
          queryKey: ["Cartitems", userId],
          refetchInactive: true,
        });
      },
      onError: (error: AxiosError) => {
        setIsProceeding(false);
        if (error.response?.status === 400) {
          fireToast('이미 추가된 아이템입니다','error')
        }
      },
      
    }
  );
  return { addToCartHandler: mutate, isProceeding };
};
