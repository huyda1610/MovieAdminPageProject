import "./profile.scss";
import React, { useEffect } from 'react';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Controls from "../../Components/controls/Controls";
import {Form } from '../../Components/useForm';
import * as yup from "yup";
import { useFormik } from "formik";
import toast, { Toaster } from 'react-hot-toast';
import { getUserDetails, submitEditUser } from "../../Slices/user";
import Loading from "../../Components/loading/Loading";
import { useNavigate } from "react-router-dom";

const itemList = [
  { id: "KhachHang", title: 'Khanh Hang' },
  { id: "QuanTri", title: 'Quan tri' },
];

const initialValues = {
  taiKhoan: "",
  matKhau: "",
  hoTen: "",
  email: "",
  soDT: "",
  maLoaiNguoiDung: "",
}

const schema = yup.object({
  matKhau: yup.string()
    .required("This field is required"),
  hoTen: yup.string()
    .required("This field is required")
    .matches(
      /^[A-Za-z ]*$/,
      "This field only contains letters"),
  email: yup.string().email()
    .required("This field is required"),
  soDT: yup.string()
    .required("This field is required")
    .matches(
      /^[0-9]*$/,
      "This field only contains numbers"
    ),
});

const Profile = () => {

  const { loginAccount } = useSelector(
    (state) => state.auth
  );

  const { userEdit, userIsLoading, userMessage } = useSelector(
    (state) => state.user
  );

  const [input, setInput]= useState(initialValues);

  const [buttonTrigger, setButton]= useState(false);

  const [isChangePassword, setChange]= useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserDetails(loginAccount.taiKhoan));
  }, []);

  useEffect(() => {
    setInput({...userEdit});
  }, [userEdit]);

  const formIk = useFormik({
    initialValues: input || userEdit,
    enableReinitialize: true,
    onSubmit: (value) => {
      const payload = {...value};
      dispatch(submitEditUser(payload));
      setButton(true);
      if (input.matKhau !== payload.matKhau) setChange(true);
    },
    validateOnMount: true,
    validationSchema: schema
  })
  
  useEffect(() => {
    if (buttonTrigger && userMessage !==null) {
      if (typeof userMessage === "object" && userMessage !== undefined) {
        if (isChangePassword) {
          toast.success("Update complete !!! (You will go back to the login page after 2s)");
          localStorage.clear();
          setChange(false);
          setTimeout(() => {
            navigate("/");
          },2000);
        } else {
          toast.success("Update complete !!!");
        }
        setButton(false);
      } 
      if (typeof userMessage === "string") {
        toast.error(`Cannot update user with errors \n ${userMessage}`);
        setButton(false);
      }
      if (userMessage === undefined) {
        toast.error(`Cannot update account profile !!!`);
        setButton(false);
      }
    }
  }, [userMessage, buttonTrigger, setButton, setChange, isChangePassword, dispatch, navigate]);

  if (userIsLoading) {
    return <Loading/>;
  }

  return (
  <div>
    <div><Toaster/></div>
    <div className="profileTop">
      <h1>Profile</h1>
    </div>
    <div className="profileBottom">
      <Form onSubmit={formIk.handleSubmit}>
        <Controls.Input
          name="taiKhoan"
          label="Account"
          value={formIk.values.taiKhoan}
          disabled={true}
        />
        <Controls.Input
          name="matKhau"
          label="Password"
          value={formIk.values.matKhau}
          onChange={formIk.handleChange}
          touched={formIk.touched.matKhau}
          error = {formIk.errors.matKhau}
        />
        <Controls.Input
          name="hoTen"
          label="Name"
          value={formIk.values.hoTen}
          onChange={formIk.handleChange}
          touched={formIk.touched.hoTen}
          error = {formIk.errors.hoTen}
        />
        <Controls.Input
          name="email"
          label="Email"
          value={formIk.values.email}
          onChange={formIk.handleChange}
          touched={formIk.touched.email}
          error = {formIk.errors.email}
        />
        <Controls.Input
          name="soDT"
          label="Phone Number"
          value={formIk.values.soDT}
          onChange={formIk.handleChange}
          touched={formIk.touched.soDT}
          error = {formIk.errors.soDT}
        />
        <Controls.Select
          name="maLoaiNguoiDung"
          label="User Type"
          value={formIk.values.maLoaiNguoiDung}
          options={itemList}
          disabled={true}
        />
        <div>
          <Controls.Button
            type="submit"
            text="Update"
            disabled={!formIk.dirty}
          />
        </div>
      </Form>
    </div>
    </div>
  );
};

export default Profile;
