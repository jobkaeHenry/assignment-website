import { ItemType } from "../../items/types/itemDataTypes";
import { ColumnWrapper, RowWrapper } from "../../../layouts/Wrapper";
import { CartItemWrapper, DeleteButton, ImageWrapper } from "./CartItemElem";
import { Link } from "react-router-dom";
import Text from "../../../components/atom/Text";
import { itemDescription } from "../../../data/URL/local/user/url";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { userInfoAtom } from "../../../context/recoil/atom/user";
import { axiosPrivate } from "../../../lib/api/axios";
import { deleteItemRoute } from "../../../data/URL/server/ItemsRoute";
import fireToast from "../../../lib/toastify/fireToast";

type Props = {
  data: ItemType;
};

const SellingItemElem = ({ data }: Props) => {
  const { description, image, id, price, title } = data;
  const queryClient = useQueryClient();
  const { userId } = useRecoilValue(userInfoAtom);

  const previousData = queryClient.getQueriesData([
    "SellingItems",
    userId,
  ])[0][1] as ItemType[];

  const { mutate:deleteItem } = useMutation(
    (id: string) => axiosPrivate.delete(deleteItemRoute(id)),
    {
      onSuccess: () => {
        fireToast('삭제에 성공했습니다','success')
        queryClient.setQueryData(["SellingItems", userId], () =>
          previousData.filter((e) => e.id !== id)
        );
        queryClient.invalidateQueries({
          queryKey: ["Items"],
          refetchInactive: true,
        });
        queryClient.invalidateQueries({
          queryKey: ["AllItems"],
          refetchInactive: true,
        });
      },
      onError: () => {
        queryClient.setQueryData(["SellingItems", userId], () => previousData);
        fireToast('삭제에 실패했습니다','error')
      },
    }
  );

  return (
    <CartItemWrapper>
      <RowWrapper>
        <Link to={itemDescription(id)}>
          <ImageWrapper src={image}></ImageWrapper>
        </Link>
        <ColumnWrapper>
          <Text typography="h3" bold className="text-overflow-hidden">
            {`[${title}]`}
          </Text>
          <Text typography="p" className="text-overflow-hidden">{description}</Text>
          <Text typography="p">{price.toLocaleString()}</Text>
        </ColumnWrapper>
      </RowWrapper>
      <DeleteButton onClick={() => deleteItem(id)}>삭제</DeleteButton>
    </CartItemWrapper>
  );
};

export default SellingItemElem;
