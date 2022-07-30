import "./userEdit.scss";
import React, { useEffect } from 'react';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../../Slices/user";

import Controls from "../../Components/controls/Controls";
import {Form } from '../../Components/useForm';
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { Box } from "@material-ui/core";
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel'
import MovieBookingInformation from "./MovieBookingInformation";
import { submitEditUser } from "../../Slices/user";
import Loading from '../../Components/loading/Loading';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

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
  maLoaiNguoiDung: "KhachHang",
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
  maLoaiNguoiDung: yup.string()
    .required("This field is required"),
});

const UserEdit = () => {
  const { userEdit, account, userIsLoading, userMessage } = useSelector(
    (state) => state.user
  );
  const [buttonTrigger, setButton]= useState(false);
  const [input, setInput] = useState(initialValues);
  const [tabValue, setTabValue] = React.useState('1');
  const {accountName} = useParams(account);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getUserDetails(accountName));
  }, []);

  useEffect(() => {
    setInput({...userEdit});
  }, [userEdit]);
  
  const formIk = useFormik({
    initialValues: input,
    enableReinitialize: true,
    onSubmit: (value) => {
      const payload = {...value};
      dispatch(submitEditUser(payload));
      setButton(true);
    },
    validateOnMount: true,
    validationSchema: schema
  })

  useEffect(() => {
    if (buttonTrigger && userMessage !==null) {
      if (typeof userMessage === "object" && userMessage !== undefined) {
        toast.success("Update complete !!!");
        setButton(false);
      } 
      if (typeof userMessage === "string") {
        toast.error(`Cannot update user with errors \n ${userMessage}`);
        setButton(false);
      }
      if (userMessage === undefined) {
        toast.error(`Cannot adding movie !!!`);
        setButton(false);
      }
    }
  }, [userMessage, buttonTrigger, setButton]);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleGoBack = () => {
    navigate("/home/users");
  }

  return (
    <div>
    <div><Toaster/></div>
    <div className="userEditTop">
      <Controls.Button
        text="Go back"
        size="medium"
        color="secondary"
        startIcon={<KeyboardBackspaceIcon />}
        onClick={handleGoBack} 
      />  
      <h1>Edit User</h1>
    </div>
    <div className="userEditBottom">
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
              <Tab label="User Details" value="1" />
              <Tab label="Movie Booking History" value="2" disabled={userIsLoading}/>
            </TabList>
          </Box>
          {userIsLoading ? <Loading/>
            : <TabPanel value="1">
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
                    onChange={formIk.handleChange}
                    options={itemList}
                    touched={formIk.touched.maLoaiNguoiDung}
                    error = {formIk.errors.maLoaiNguoiDung}
                    mode={true}
                  />
                  <div>
                    <Controls.Button
                      type="submit"
                      text="Update"
                      disabled={!formIk.dirty}
                    />
                  </div>
              </Form>
            </TabPanel>
          }
          <TabPanel value="2">
          {(!userIsLoading) ? <MovieBookingInformation rows={input.thongTinDatVe}/>
          : <p>This user has no booking history</p>}
          </TabPanel>
        </TabContext>
      </Box>
    </div>
    </div>
  );
};

export default UserEdit;
