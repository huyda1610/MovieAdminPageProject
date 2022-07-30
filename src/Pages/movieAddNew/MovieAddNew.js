import "./movieAddNew.scss";
import React, { useEffect } from 'react';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewMovie } from "../../Slices/movie";

import { Grid } from "@mui/material";
import Controls from "../../Components/controls/Controls";
import {Form } from '../../Components/useForm';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import dayjs from "dayjs";
import * as yup from "yup";
import { useFormik } from "formik";
import toast, { Toaster } from 'react-hot-toast';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from "react-router-dom";

const itemList = [
  { id: "true", title: 'Yes' },
  { id: "false", title: 'No' },
];

const initialValues = {
  tenPhim: "",
  biDanh: "",
  trailer: "",
  moTa: "",
  ngayKhoiChieu: new Date(),
  danhGia: 1,
  hot: "",
  dangChieu: "",
  sapChieu: "",
}

const schema = yup.object({
  tenPhim: yup.string()
    .required("This field is required"),
  biDanh: yup.string()
    .required("This field is required")
    .matches(
      /^[\w\d-]+$/,
      "This field only contains letters, numbers and dash"
    ),
  trailer: yup.string()
    .required("This field is required")
    .matches(
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
      "This field only contains URL link"
    ),
  moTa: yup.string()
    .required("This field is required"),
  danhGia: yup.number()
    .required("This field is required")
    .min(1, "Minimum at least 1")
    .max(10, "Allowed maximum is 10"),
  hot: yup.string()
    .required("This field is required"),
  dangChieu: yup.string()
    .required("This field is required"),
  sapChieu: yup.string()
    .required("This field is required"),
  hinhAnh: yup.mixed().required('File is required'),
});

const MovieAddNew = () => {
  const [file, setFile] = useState(null);

  const [submitTrigger, setSubmitTrigger]= useState(false);

  const { addMovieMessage } = useSelector(
    (state) => state.movie
  );

  const navigate = useNavigate()

  const dispatch = useDispatch();

  const formIk = useFormik({
    initialValues: initialValues,
    onReset: () => {
      setFile(null);
    },
    onSubmit: (value) => {
      const payload = {
        ...value,
        hot: (value.hot === "true"),
        dangChieu: (value.dangChieu === "true"),
        sapChieu: (value.sapChieu === "true"),
        ngayKhoiChieu: dayjs(value.ngayKhoiChieu).format("DD/MM/YYYY")
      }
      dispatch(addNewMovie(payload));
      setSubmitTrigger(true);
    },
    validateOnMount: true,
    validateOnBlur: true,
    validationSchema: schema
  })

  useEffect(() => {
    if (submitTrigger && addMovieMessage !==null) {
      if (typeof addMovieMessage === "object" && addMovieMessage !== undefined) {
        toast.success("Adding complete !!!");
        formIk.resetForm();
      } 
      if (typeof addMovieMessage === "string") {
        toast.error(`Cannot adding movie with errors \n ${addMovieMessage}`);
      }
      if (addMovieMessage === undefined) {
        toast.error(`Cannot adding movie !!!`);
      }
      setSubmitTrigger(false);
    }
  }, [addMovieMessage, submitTrigger, setSubmitTrigger, formIk]);

  const handleGoBack = () => {
    navigate("/home/movies");
  };

  console.log((formIk.errors.hinhAnh === undefined) && file === null);
  return (
  <div>
    <div><Toaster/></div>
    <div className="topNew">
      <Controls.Button
        text="Go back"
        size="medium"
        color="secondary"
        startIcon={<KeyboardBackspaceIcon />}
        onClick={handleGoBack} 
      />      
      <h1>Add New Movie</h1>
    </div>
    <div className="bottomNew">
    <Form onSubmit={formIk.handleSubmit}>
        <Grid container>
            <Grid item xs={6}>
              <Controls.Input
                name="tenPhim"
                label="Movie Name"
                value={formIk.values.tenPhim}
                onChange={formIk.handleChange}
                onblur={formIk.handleBlur}
                touched={formIk.touched.tenPhim}
                error = {formIk.errors.tenPhim}
              />
              <Controls.Input
                name="biDanh"
                label="Code Name"
                value={formIk.values.biDanh}
                onChange={formIk.handleChange}
                onblur={formIk.handleBlur}
                touched={formIk.touched.biDanh}
                error = {formIk.errors.biDanh}
              />
              <Controls.Input
                name="trailer"
                label="Trailer Link"
                value={formIk.values.trailer}
                onChange={formIk.handleChange}
                onblur={formIk.handleBlur}
                touched={formIk.touched.trailer}
                error = {formIk.errors.trailer}
              />
              <Controls.Input
                name="moTa"
                label="Description"
                value={formIk.values.moTa}
                onChange={formIk.handleChange}
                onblur={formIk.handleBlur}
                touched={formIk.touched.moTa}
                error = {formIk.errors.moTa}
              />
              <Controls.Input
                name="danhGia"
                label="Rate"
                value={formIk.values.danhGia}
                onChange={formIk.handleChange}
                onblur={formIk.handleBlur}
                touched={formIk.touched.danhGia}
                error = {formIk.errors.danhGia}
              />
              <div>
                  <Controls.Button
                      type="submit"
                      text="Submit"
                      disabled={(!formIk.dirty && file === null)}
                  />
                  <Controls.Button
                      text="Reset"
                      color="default"
                      onClick={formIk.resetForm} 
                  />
              </div>
            </Grid>
            <Grid item xs={6}>
              <Controls.DatePicker
                  name="ngayKhoiChieu"
                  label="Opening Day"
                  onChange={formIk.handleChange}
                  value= {formIk.values.ngayKhoiChieu}
              />
              <div>
                <Controls.RadioGroup
                  name="hot"
                  label="Hot"
                  value={formIk.values.hot}
                  onChange={formIk.handleChange}
                  items={itemList}
                  touched={formIk.touched.hot}
                  error = {formIk.errors.hot}
                />
              </div>
              <div>
                <Controls.RadioGroup
                  name="dangChieu"
                  label="Now Showing"
                  value={formIk.values.dangChieu}
                  onChange={formIk.handleChange}
                  items={itemList}
                  touched={formIk.touched.dangChieu}
                  error = {formIk.errors.dangChieu}
                />
              </div>
              <div>
                <Controls.RadioGroup
                  name="sapChieu"
                  label="Coming Soon"
                  value={formIk.values.sapChieu}
                  onChange={formIk.handleChange}
                  items={itemList}
                  touched={formIk.touched.sapChieu}
                  error = {formIk.errors.sapChieu}
                />
              </div>
              <div>
              <div className="formInput">
                  <label htmlFor="file">
                    Change Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="hinhAnh"
                    multiple="multiple"
                    onChange={(e) => {setFile(e.target.files[0]); formIk.values.hinhAnh = e.target.files[0];}}
                    style={{ display: "none", }}
                  />
                  {((file === null) || (file === undefined)) && <p style={{color: "red"}}>File is required</p>}
                </div>                    
                <img
                  src={
                      file
                        ? URL.createObjectURL(file)
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt=""
                    width="250px"
                    height="250px"
                />
              </div>
            </Grid>
          </Grid>
        </Form>
      </div>
    </div>
  );
};

export default MovieAddNew;
