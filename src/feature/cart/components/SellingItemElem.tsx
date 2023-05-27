import { ItemType } from "../../items/types/itemDataTypes";
import { ColumnWrapper, RowWrapper } from "../../../layouts/Wrapper";
import { CartItemWrapper, ImageWrapper } from "./CartItemElem";
import { Link } from "react-router-dom";
import Text from "../../../components/atom/Text";
import { itemDescription } from "../../../data/URL/local/user/url";

type Props = {
  data: ItemType;
};

const SellingItemElem = ({ data }: Props) => {
  const { description, image, id, price, title } = data;

  return (
    <CartItemWrapper>
      <RowWrapper>
        <Link to={itemDescription(id)}>
          <ImageWrapper src={image}></ImageWrapper>
        </Link>
        <ColumnWrapper>
          <Text typography="h3" bold>
            {`[${title}]`}
          </Text>
          <Text typography="p">{description}</Text>
          <Text typography="p">{price}</Text>
        </ColumnWrapper>
      </RowWrapper>
    </CartItemWrapper>
  );
};

export default SellingItemElem;
