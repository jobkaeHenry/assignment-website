import { NotifyMessage } from "../../../components/atom/lodaing/Error";
import { useRecoilValue } from "recoil";
import { userInfoAtom } from "../../../context/recoil/atom/user";
import { css } from "@emotion/react";
import SellingItemElem from "./SellingItemElem";
import { Button } from "../../../components/atom/form/Button";
import useModal from "./../../../hooks/useModal";
import { ItemListWrapper } from "./CartItemList";
import Text from "../../../components/atom/Text";
import styled from "@emotion/styled";
import AddItemModal from "./AddItemModal";
import { useGetSellingItemQuery } from "../api/useSellingItemsQuery";

const SellingItemList = () => {
  const { userId } = useRecoilValue(userInfoAtom);

  const { data } = useGetSellingItemQuery(userId);

  const onClickModal = useModal();

  return (
    <ItemListWrapper>
      <TitleWrapper>
        <Text typography="h3" bold>
          판매중인 상품
        </Text>
        <Button css={addItem} onClick={() => onClickModal(<AddItemModal />)}>
          아이템추가
        </Button>
      </TitleWrapper>
      {(data ?? []).length !== 0 ? (
        (data ?? []).map((sellingItem, i) => (
          <SellingItemElem data={sellingItem} key={sellingItem.id + i} />
        ))
      ) : (
        <NotifyMessage message="판매중인 상품이 없습니다"></NotifyMessage>
      )}
    </ItemListWrapper>
  );
};

export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const addItem = css`
  width: fit-content;
  padding: 8px;
  font-size: var(--p);
  background-color: var(--sub-color);
`;

export default SellingItemList;
