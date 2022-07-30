import React from 'react'
import "./navbar.scss";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { loginAccount } = useSelector(
    (state) => state.auth
  );

  return (
    <div className="navbar">
      <div className="wrapper">
        <div>
        </div>
        <div className="items">
          <div className="item">
            <h3 style={{color: "#7451f8"}}>Welcome {loginAccount.hoTen} </h3>
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
