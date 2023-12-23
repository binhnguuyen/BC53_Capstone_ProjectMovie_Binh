import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./modules/home";
// import NotFound from "./modules/not-found";
import MovieLayout from "./layouts/MovieLayout";
// import Details from "./modules/details";
import { PATH } from "./routes/path";
// import Signin from "./modules/auth/Signin";
// import Signup from "./modules/auth/Signup";
import { UserProvider, DarkModeProvider } from "./contexts/UserContext/UserContext";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
// import AddMovie from "./modules/admin/MovieManagement/AddMovie";
import { Suspense, lazy } from "react";
// import Memo from "./modules/renders/Memo";

// Khi mình vào trang nào thì nó mới load page của trang đó vào chứ ko load 1 lần ngay cả chỉ ở trang home. Đây gọi là cơ chết lazy load, load làm biếng.
const Home = lazy(() => import("./modules/home"))
const NotFound = lazy(() => import("./modules/not-found"))
const Details = lazy(() => import("./modules/details"))
const Signin = lazy(() => import("./modules/auth/Signin"))
const Signup = lazy(() => import("./modules/auth/Signup"))
const AddMovie = lazy(() => import("./modules/admin/MovieManagement/AddMovie"))
const Booking = lazy(() => import("./modules/booking"))
// const Memo = lazy(() => import("./modules/renders/Memo"))


function App() {
  return (
    <DarkModeProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            {/* Layout của user */}
            <Route path={PATH.HOME} element={<MovieLayout />}>
              {/* khi xài lazy thì dùng chung với suspense */}
              {/* <Route index element={<Home />} /> */}
              <Route
                index
                element={
                  <Suspense callBack={<div>Loading</div>}>
                    <Home />
                  </Suspense>
                }
              />
              {/* để useParams lấy đc movieId bên trang Detailes về phải viết như sau */}
              <Route path="movie/:movieId"
                element={
                  <Suspense callBack={<div>Loading</div>}>
                    <Details />
                  </Suspense>
                }
              />
              {/* để useParams lấy đc maLichChieu bên trang Booking về phải viết như sau */}
              <Route path="booking/:maLichChieu"
                element={
                  <Suspense callBack={<div>Loading</div>}>
                    <Booking />
                  </Suspense>
                }
              />
              <Route path={PATH.SIGN_IN}
                element={
                  <Suspense callBack={<div>Loading</div>}>
                    <Signin />
                  </Suspense>
                }
              />
              <Route path={PATH.SIGN_UP} element={
                <Suspense callBack={<div>Loading</div>}>
                  <Signup />
                </Suspense>
              }
              />
              {/* <Route path="prevent-re-render" element={< Memo/>}/> */}
            </Route>

            {/* Layout của Admin */}
            <Route path={PATH.ADMIN} element={<AdminLayout />}>
              <Route index element={
                <Suspense
                  callBack={<div>Loading</div>}>
                  <AddMovie />
                </Suspense>
              }
              />
            </Route>

            {/* Trang NotFound */}
            <Route path="*"
              element={
                <Suspense
                  callBack={<div>Loading</div>}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </DarkModeProvider>
    // lấy thằng này bọc cái app để chia sẻ nhưng component

  );
}

export default App;
