import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./modules/home";
import NotFound from "./modules/not-found";
import MovieLayout from "./layouts/MovieLayout";
import Details from "./modules/details";
import { PATH } from "./routes/path";
import Signin from "./modules/auth/Signin";
import Signup from "./modules/auth/Signup";
import { UserProvider } from "./contexts/UserContext/UserContext";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import AddMovie from "./modules/admin/MovieManagement/AddMovie";
// import Memo from "./modules/renders/Memo";


function App() {
  return (
    // lấy thằng này bọc cái app để chia sẻ nhưng component
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Layout của user */}
          <Route path={PATH.HOME} element={<MovieLayout />}>
            <Route index element={<Home />} />
            <Route path="movie/:movieId" element={<Details />} />
            <Route path={PATH.SIGN_IN} element={<Signin />} />
            <Route path={PATH.SIGN_UP} element={<Signup />} />
            {/* <Route path="prevent-re-render" element={< Memo/>}/> */}
          </Route>

          {/* Layout của Admin */}
          <Route path={PATH.ADMIN} element={<AdminLayout />}>
            <Route index element={<AddMovie />} />
          </Route>

          {/* Trang NotFound */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
