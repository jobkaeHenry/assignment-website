import { useQuery } from "react-query";
import { NotifyMessage } from "../../../components/atom/lodaing/Error";
import { axiosPrivate } from "../../../lib/api/axios";
import { useRecoilValue } from "recoil";
import { userInfoAtom } from "../../../context/recoil/atom/user";
import { css } from "@emotion/react";
import { getItemsByUserId } from "../../../data/URL/server/ItemsRoute";
import { ItemType } from "../../items/types/itemDataTypes";
import SellingItemElem from "./SellingItemElem";

const SellingItemList = () => {
  const { userId } = useRecoilValue(userInfoAtom);

  const { data } = useQuery<ItemType[]>(["SellingItems", userId], () =>
    axiosPrivate
      .get(getItemsByUserId, { data: { userId: userId } })
      .then(({ data }) => {
        console.log(data);
        return data;
      })
  );

  return (
    <div css={width100}>
      {data!.length !== 0 ? (
        data!.map((sellingItem, i) => (
          <SellingItemElem data={sellingItem} key={sellingItem.id + i} />
        ))
      ) : (
        <NotifyMessage message="판매중인 상품이 없습니다"></NotifyMessage>
      )}
    </div>
  );
};

export default SellingItemList;

const width100 = css`
  width: 100%;
`;
