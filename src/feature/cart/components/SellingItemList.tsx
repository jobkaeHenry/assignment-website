import { useQuery } from "react-query";
import { NotifyMessage } from "../../../components/atom/lodaing/Error";
import { axiosPrivate } from "../../../lib/api/axios";
import { useRecoilValue } from "recoil";
import { userInfoAtom } from "../../../context/recoil/atom/user";
import { css } from "@emotion/react";
import { getItemsByUserId } from "../../../data/URL/server/ItemsRoute";
import { ItemType } from "../../items/types/itemDataTypes";
import SellingItemElem from "./SellingItemElem";
import { Button } from "../../../components/atom/form/Button";
import useModal from "./../../../hooks/useModal";

const SellingItemList = () => {
  const { userId } = useRecoilValue(userInfoAtom);

  const { data } = useQuery<ItemType[]>(["SellingItems", userId], () =>
    axiosPrivate
      .get(getItemsByUserId, { data: { userId: userId } })
      .then(({ data }) => {
        return data;
      })
  );
  const onClickModal = useModal();

  return (
    <div css={width100}>
      {data!.length !== 0 ? (
        data!.map((sellingItem, i) => (
          <SellingItemElem data={sellingItem} key={sellingItem.id + i} />
        ))
      ) : (
        <NotifyMessage message="판매중인 상품이 없습니다"></NotifyMessage>
      )}
      <Button onClick={() => onClickModal(<>모달테스트</>)}>아이템추가</Button>
    </div>
  );
};

export default SellingItemList;

const width100 = css`
  width: 100%;
  height: calc(100vh - 76px);
`;
