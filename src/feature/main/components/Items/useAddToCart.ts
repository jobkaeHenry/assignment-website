import { useMutation, useQueryClient } from "react-query";
import { axiosPrivate } from "../../../../lib/api/axios";
import { useRecoilValue } from "recoil";
import { userInfoAtom } from "../../../../context/recoil/atom/user";
import { useState } from "react";
import { addToCartRoute } from "../../../../data/URL/server/cartRoute";
import { AxiosError } from "axios";

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
        // 토스트 팝업해야함
        setIsProceeding(false);
        queryClient.invalidateQueries({
          queryKey: ["Cartitems", userId],
          refetchInactive: true,
        });
      },
      onError: (error: AxiosError) => {
        if (error.response?.status === 400) {
          setIsProceeding(false);
          alert("이미 추가된 아이템입니다");
        }
      },
    }
  );
  return { addToCartHandler: mutate, isProceeding };
};
