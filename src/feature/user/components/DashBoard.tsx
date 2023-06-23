import { useRecoilValue, useSetRecoilState } from "recoil";
import { userInfoAtom } from "../../../context/recoil/atom/user";
import styled from "@emotion/styled";
import Text from "../../../components/atom/Text";
import { Button } from "./../../../components/atom/form/Button";
import { ColumnWrapper } from "../../../layouts/Wrapper";
import { axiosPrivate } from "../../../lib/api/axios";
import { upgradeRoute } from "../../../data/URL/server/userRoute";

const DashBoard = () => {
  const { isSeller, userName, isSellerNow } = useRecoilValue(userInfoAtom);
  const setUserInfo = useSetRecoilState(userInfoAtom);
  /**
   * 유저의 Seller권한을 True로 상승을 요청하는 함수
   */
  const upgradeRole = async () => {
    return axiosPrivate.post(upgradeRoute).then(() => {
      setUserInfo((prev) => ({ ...prev, isSeller: true }));
    });
  };
    /**
   * 유저의 권한을 전환하는 함수
   */
  const switchRole = () => {
    if (isSeller) {
      setUserInfo((prev) => ({ ...prev, isSellerNow: !prev.isSellerNow }));
    }
    if (!isSeller) {
      upgradeRole().then(() => {
        setUserInfo((prev) => ({ ...prev, isSellerNow: true }));
        alert("전환 완료되었습니다");
      });
    }
  };
  return (
    <DashBoardWarpper>
      <ColumnWrapper>
        <Text typography="h4" bold align="center">
          {`${userName}`}
        </Text>
        {!isSellerNow ? (
          <Button onClick={switchRole}>판매자로 전환</Button>
        ) : (
          <Button onClick={switchRole}>일반회원으로 전환</Button>
        )}
      </ColumnWrapper>
    </DashBoardWarpper>
  );
};

export default DashBoard;

const DashBoardWarpper = styled.div`
  width: 260px;
  padding: 16px;
  height: calc(100vh - 76px);
  border-right: 1px solid var(--line-gray);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
