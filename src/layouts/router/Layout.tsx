import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import DefaultLayout from "../DefaultLayout";
import { LoginStatus } from "../../context/recoil/atom/user";
import useSetIsLogout from "../../hooks/user/useSetIsLogout";
import { getLS } from "../../utils/localStorage";
import { userPage } from "../../data/URL/local/user/url";
import Footer from "../../components/Footer";

/**
 * 로그인한 경우 메인페이지로 Redirect 시키는 HOC
 */
export const LogOutOnly = () => {
  const isLogin = useRecoilValue(LoginStatus);
  return !isLogin ? <Outlet /> : <Navigate to={userPage} />;
};

/**
 * 로그인을 하지 않았을 경우 로그인 페이지로 Redirect 시키는 HOC
 */
export const UserOnly = () => {
  const currentLocation = useLocation();
  const setLogout = useSetIsLogout();

  const checkAuth = () => {
    const access = getLS("accessToken");
    const refresh = getLS("refreshToken");
    if (refresh && access) {
      return true;
    } else {
      setLogout();
      return false;
    }
  };
  return checkAuth() ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: currentLocation }} to="/user/login" replace />
  );
};
/** 푸터 가 포함된 레이아웃 HOC */
export const FooterLayout = () => {
  return (
    <>
      <Outlet />
      <Footer></Footer>
    </>
  );
};
/** 네비게이션 바 높이 만큼 마진을 제공하는 레이아웃ㅅ */
const MarginTopLayout = () => {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};

export default MarginTopLayout;
