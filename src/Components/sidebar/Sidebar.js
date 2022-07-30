import React from 'react'
import "./sidebar.scss";
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { logout } from '../../Slices/auth';
import { useDispatch } from 'react-redux';

const Sidebar = () => {
  const dispatch = useDispatch()
  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("adminAccount");
    dispatch(logout());
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="" style={{ textDecoration: "none" }}>
          <span className="logo">Movie Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">LISTS</p>
          <Link to="/home/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/home/movies" style={{ textDecoration: "none" }}>
            <li>
              <LocalMoviesIcon className="icon" />
              <span>Movies</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <Link to="/home/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <ExitToAppIcon className="icon" />
              <div onClick={handleLogOut}>
                <span>Logout</span>
              </div>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar
