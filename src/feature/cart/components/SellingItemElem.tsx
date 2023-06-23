import { ItemType } from "../../items/types/itemDataTypes";
import { ColumnWrapper, RowWrapper } from "../../../layouts/Wrapper";
import { CartItemWrapper, DeleteButton, ImageWrapper } from "./CartItemElem";
import { Link } from "react-router-dom";
import Text from "../../../components/atom/Text";
import { itemDescription } from "../../../data/URL/local/user/url";
import { useRecoilValue } from "recoil";
import { userInfoAtom } from "../../../context/recoil/atom/user";

import { useDeleteSellingItemQuery } from "../api/useSellingItemsQuery";

type Props = {
  data: ItemType;
};

const SellingItemElem = ({ data }: Props) => {
  const { description, image, id, price, title } = data;

  const { userId } = useRecoilValue(userInfoAtom);

  const { mutate: deleteItem } = useDeleteSellingItemQuery(userId);

  return (
    <CartItemWrapper>
      <RowWrapper>
        <Link to={itemDescription(id)}>
          <ImageWrapper src={image}></ImageWrapper>
        </Link>
        <ColumnWrapper>
          <Text typography="h3" bold className="text-overflow-hidden">
            {title}
          </Text>
          <Text typography="p" className="text-overflow-hidden">
            {description}
          </Text>
          <Text typography="p">{price.toLocaleString()}</Text>
        </ColumnWrapper>
      </RowWrapper>
      <DeleteButton onClick={() => deleteItem(id)}>삭제</DeleteButton>
    </CartItemWrapper>
  );
};

export default SellingItemElem;
