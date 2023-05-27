import Text from "../../../../components/atom/Text";
import { ItemType } from "../../../items/types/itemDataTypes";
import styled from "@emotion/styled";

type Props = {
  data: ItemType;
};

const ItemCard = ({ data }: Props) => {
  const { description, id, image, price, title, seller } = data;
  return (
    <CardWrapper>
      <ImageWrapper>
        <img src={image} alt={title} />
      </ImageWrapper>
      <Text typography={"h4"} weight="var(--medium)">
        {title}
      </Text>
      <Text typography={"h4"} color="var(--font-gray)">
        {price.toLocaleString() + "원"}
      </Text>
      <Text typography={"sub"} weight="var(--medium)">
        {description}
      </Text>
    </CardWrapper>
  );
};

export default ItemCard;

const ImageWrapper = styled.div`
  width: 240px;
  height: 240px;
  background-color: var(--bg-gray);
  & > img {
    width: 240px;
    height: 240px;
  }
`;

const CardWrapper = styled.div`
  width: 260px;
  height: 400px;
  padding: 16px;
  display: flex;
  gap: 4px;
  flex-direction: column;
`;
