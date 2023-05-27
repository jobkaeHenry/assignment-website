import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Modal } from "./components/GlobalModal/Modal";
import Navbar from "./components/Navbar/Navbar";
import { Suspense, lazy } from "react";
import NestedLayout, { LogOutOnly, UserOnly } from "./layouts/router/Layout";
import Main from "./pages/Main/Main";
import { LoadingSpinner } from "./components/atom/lodaing/Spinner";
import { css } from "@emotion/react";


// 페이지 진입시만 불러올 것
const Missing = lazy(() => import("./pages/Error/MissingPage"));
const Login = lazy(() => import("./pages/user/login"));
const Signup = lazy(() => import("./pages/user/Signup"));
const UserPage = lazy(() => import("./pages/user/UserPage"));
import useInitialLoginCheck from "./hooks/user/useInitialLoginCheck";

function App() {
  useInitialLoginCheck();

  return (
    <BrowserRouter>
      <Modal />
      <Navbar />
      <Suspense fallback={<LoadingSpinner css={centerPosition} size={46} />}>
        <Routes>
          <Route path="/" element={<Main />} />
          {/* 유저라우트 */}
          <Route path="user" element={<NestedLayout />}>
            {/* 유저전용 라우트 */}
            <Route element={<UserOnly />}>
              <Route index element={<UserPage />} />
            </Route>
            {/* 비회원 전용 라우트 */}
            <Route element={<LogOutOnly />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          </Route>
          {/* 404 */}
          <Route path="*" element={<Missing />} />
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
