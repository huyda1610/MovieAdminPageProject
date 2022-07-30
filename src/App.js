import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { lazy } from "react";
import Movies from "./Pages/movies/Movies";
import MovieEdit from "./Pages/movieEdit/MovieEdit";
import MovieAddNew from "./Pages/movieAddNew/MovieAddNew";
import Login from "./Pages/login/Login";
import ProtectedRoute from "./Routes/ProtectedRoute";
import HomeTemplate from "./Templates/HomeTemplate/HomeTemplate";
import Users from "./Pages/users/Users";
import UserAddNew from "./Pages/userAddNew/UserAddNew";
import UserEdit from "./Pages/userEdit/UserEdit";
import MovieCreateSchedule from "./Pages/movieCreateSchedule/MovieCreateSchedule";
import Profile from "./Pages/profile/Profile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path="home" element={<HomeTemplate />}>
            <Route path="movies" element={<Movies />} />
            <Route path="movies/new" element={<MovieAddNew />} />
            <Route path="movies/edit/:id" element={<MovieEdit/>} />
            <Route path="movies/schedule/:id" element={<MovieCreateSchedule/>} />
            <Route path="users" element={<Users />} />
            <Route path="users/new" element={<UserAddNew />} />
            <Route path="users/edit/:accountName" element={<UserEdit/>} />
            <Route path="profile" element={<Profile/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
