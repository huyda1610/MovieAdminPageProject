import "./userAddNew.scss";
import React, { useEffect } from 'react';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewUser } from "../../Slices/user";

import Controls from "../../Components/controls/Controls";
import {Form } from '../../Components/useForm';
import * as yup from "yup";
import { useFormik } from "formik";
import toast, { Toaster } from 'react-hot-toast';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
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
  taiKhoan: yup.string()
    .required("This field is required")
    .matches(
      /^[A-Za-z0-9_]*$/,
      "This field only contains letters, numbers and _"
    ),
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
  maLoaiNguoiDung: yup.string()
    .required("This field is required"),
});

const UserAddNew = () => {
  const [buttonTrigger, setButton]= useState(false);

  const { userMessage } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const formIk = useFormik({
    initialValues: initialValues,
    onSubmit: (value) => {
      const payload = {...value,
      };
      dispatch(addNewUser(payload));
      setButton(true);
    },
    validateOnMount: true,
    validationSchema: schema
  })

  useEffect(() => {
    if (buttonTrigger && userMessage !==null) {
      if (typeof userMessage === "object" && userMessage !== undefined) {
        toast.success("Adding complete !!!");
        formIk.resetForm();
        setButton(false);
      } 
      if (typeof userMessage === "string") {
        toast.error(`Cannot adding user with errors \n ${userMessage}`);
        setButton(false);
      }
      if (userMessage === undefined) {
        toast.error(`Cannot adding user !!!`);
        setButton(false);
      }
    }
  }, [userMessage, buttonTrigger, setButton, formIk]);

  const handleGoBack = () => {
    navigate("/home/users");
  };

  return (
  <div>
    <div><Toaster/></div>
    <div className="userTop">
      <Controls.Button
        text="Go back"
        size="medium"
        color="secondary"
        startIcon={<KeyboardBackspaceIcon />}
        onClick={handleGoBack} 
      />  
      <h1>Add New User</h1>
    </div>
    <div className="userBottom">
      <Form onSubmit={formIk.handleSubmit}>
        <Controls.Input
          name="taiKhoan"
          label="Account"
          value={formIk.values.taiKhoan}
          onChange={formIk.handleChange}
          touched={formIk.touched.taiKhoan}
          error = {formIk.errors.taiKhoan}
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
          onChange={formIk.handleChange}
          options={itemList}
          touched={formIk.touched.maLoaiNguoiDung}
          error = {formIk.errors.maLoaiNguoiDung}
        />
        <div>
            <Controls.Button
                type="submit"
                text="Submit"
            />
            <Controls.Button
                text="Reset"
                color="default"
                onClick={formIk.resetForm} 
            />
        </div>
      </Form>
    </div>
    </div>
  );
};

export default UserAddNew;
