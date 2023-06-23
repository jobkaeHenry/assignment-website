import Text from "../../../../components/atom/Text";
import { ItemType } from "../../../items/types/itemDataTypes";
import styled from "@emotion/styled";
import { LoadingSpinner } from "../../../../components/atom/lodaing/Spinner";
import { Link } from "react-router-dom";
import { itemDescription } from "../../../../data/URL/local/user/url";
import { useAddToCart } from "./useAddToCart";
import { useQueryClient } from "react-query";
import axios from "../../../../lib/api/axios";
import { getItemRoute } from "../../../../data/URL/server/ItemsRoute";

type Props = {
  data: ItemType;
};

const ItemCard = ({ data }: Props) => {
  const { description, id, image, price, title } = data;

  const { isProceeding, addToCartHandler } = useAddToCart();
  const queryClient = useQueryClient();
  const preFetchQuery = (id:string) =>
    queryClient.prefetchQuery(["ItemDetail", id], async () => {
      const { data } = await axios.get(getItemRoute(id));
      return data;
    });

  return (
    <CardWrapper onMouseOver={()=>preFetchQuery(id)}>
      <ImageWrapper>
        <AddToCartBtn
          role="button"
          title="장바구니에 추가"
          onClick={() => {
            if (!isProceeding) addToCartHandler(id);
          }}
        >
          {isProceeding ? <LoadingSpinner size={24} /> : "+"}
        </AddToCartBtn>
        <Link to={itemDescription(id)}>
          <img src={image} alt={`${title} 사진`} />
        </Link>
      </ImageWrapper>
      <Text typography={"h4"} weight="var(--medium)">
        {title}
      </Text>
      <Text typography={"h4"} color="var(--font-gray)">
        {price.toLocaleString() + "원"}
      </Text>
      <Text typography={"sub"} weight="var(--medium)" className="text-overflow-hidden">
        {description}
      </Text>
    </CardWrapper>
  );
};

export default ItemCard;

const ImageWrapper = styled.div`
  position: relative;
  width: 240px;
  height: 240px;
  background-color: var(--bg-gray);
  & img {
    width: 240px;
    height: 240px;
    object-fit: cover;
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

const AddToCartBtn = styled.button`
  width: 36px;
  height: 36px;
  font-size: var(--h3);
  background-color: var(--pure-white);
  color: var(--sub-color);
  border: 1px solid var(--line-gray);
  position: absolute;
  top: 4px;
  right: 4px;
  border-radius: 50%;
  padding-bottom: 2px;
`;
