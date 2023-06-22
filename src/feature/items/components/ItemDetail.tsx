import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "../../../lib/api/axios";
import { getItemRoute } from "../../../data/URL/server/ItemsRoute";
import { ItemType } from "../types/itemDataTypes";
import Text from "../../../components/atom/Text";
import styled from "@emotion/styled";
import { ColumnWrapper, RowWrapper } from "../../../layouts/Wrapper";
import { Button } from "./../../../components/atom/form/Button";
import { useAddToCart } from "../../main/components/Items/useAddToCart";
import useSetTitle from "../../../hooks/useSetTitle";

const ItemDetail = () => {
  const { id } = useParams();
  const { data } = useQuery<ItemType>(["ItemDetail", id], async () => {
    const { data } = await axios.get(getItemRoute(id || ""));

    return data;
  });
  const { addToCartHandler } = useAddToCart();
  useSetTitle(data?.title ?? "상품 상세설명");

  return (
    <RowWrapper>
      <ItemImage width={400} height={600} src={data?.image} alt={`${data?.title} 이미지`} />
      <DescriptionWrapper>
        <ColumnWrapper>
          <Text typography="h2" bold>
            {data?.title}
          </Text>
          <Text typography="p">{data?.description}</Text>
          <Text typography="h3" bold>
            {data?.price.toLocaleString() + "원"}
          </Text>
        </ColumnWrapper>

        <ColumnWrapper>
          <TermWrapper>
            
          </TermWrapper>

          <Button
            onClick={() => {
              if (data?.id) {
                addToCartHandler(data.id);
              }
            }}
          >
            장바구니에 추가
          </Button>
        </ColumnWrapper>
      </DescriptionWrapper>
    </RowWrapper>
  );
};

const ItemImage = styled.img`
  width: 400px;
  height: 600px;
  object-fit: cover;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  height: 600px;
  padding: 32px;
`;

const TermWrapper = styled.div`
  padding: 32px;
  border: 1px solid var(--line-gray);
`;

export default ItemDetail;
