import React, {useState } from 'react'
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const { loginAccount } = useSelector(
    (state) => state.auth
  );

  if ((loginAccount !== null) && (typeof loginAccount !== "string")
    && (loginAccount.maLoaiNguoiDung !== "KhachHang")) 
  {
    return <Outlet/>
  } else {
    <Navigate to="/"/>
  }
}

export default ProtectedRoute