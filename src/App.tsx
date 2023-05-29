import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Modal } from "./components/GlobalModal/Modal";
import Navbar from "./components/Navbar/Navbar";
import { Suspense, lazy } from "react";
import { FooterLayout, LogOutOnly, UserOnly } from "./layouts/router/Layout";
import Main from "./pages/Main/Main";
import { LoadingSpinner } from "./components/atom/lodaing/Spinner";
import { css } from "@emotion/react";
import useInitialLoginCheck from "./hooks/user/useInitialLoginCheck";
import MarginTopLayout from "./layouts/router/Layout";
import ItemDetail from "./pages/Items/ItemDetailPage";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 페이지 진입시만 불러올 것
const Missing = lazy(() => import("./pages/Error/MissingPage"));
const Login = lazy(() => import("./pages/user/login"));
const Signup = lazy(() => import("./pages/user/Signup"));
const UserPage = lazy(() => import("./pages/user/UserPage"));

function App() {
  useInitialLoginCheck();
  useAxiosPrivate();

  return (
    <BrowserRouter>
      <ToastContainer />
      <Modal />
      <Navbar />
      <Suspense fallback={<LoadingSpinner css={centerPosition} size={46} />}>
        <Routes>
          <Route element={<MarginTopLayout />}>
            <Route element={<FooterLayout />}>
              <Route path="/" element={<Main />} />
              {/* 아이템 상세페이지 */}
              <Route path="/item/:id" element={<ItemDetail />} />
            </Route>
            {/* 유저라우트 */}
            <Route path="user" element={<Outlet />}>
              {/* 비회원 전용 라우트 */}
              <Route element={<LogOutOnly />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
              </Route>
              {/* 유저전용 라우트 */}
              <Route element={<UserOnly />}>
                <Route index element={<UserPage />} />
              </Route>
            </Route>
            {/* 404 */}
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
const centerPosition = css`
  position: absolute;
  z-index: 999;
  top: calc(50vh - 23px);
  left: calc(50vw - 23px);
`;

export default App;
