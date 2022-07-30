import "./movieEdit.scss";
import React, { useEffect } from 'react';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMovieDetails, submitEditMovie } from "../../Slices/movie";

import { Grid } from "@mui/material";
import Controls from "../../Components/controls/Controls";
import {Form } from '../../Components/useForm';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import dayjs from "dayjs";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const itemList = [
  { id: "true", title: 'Yes' },
  { id: "false", title: 'No' },
];

const initialValues = {
  maPhim: "",
  tenPhim: "",
  biDanh: "",
  trailer: "",
  hinhAnh: "",
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
    .required("This field is required"),
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
});

const MovieEdit = () => {
  const [file, setFile] = useState(null);

  const [buttonTrigger, setButton]= useState(false);

  const { movieEdit, movieId, addMovieMessage } = useSelector(
    (state) => state.movie
  );
  const [input, setInput] = useState(initialValues);
  const {id} = useParams(movieId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getMovieDetails(id));
  }, []);

  useEffect(() => {
    dispatch(getMovieDetails(id));
  }, []);
  
  useEffect(() => {
    setInput(() => ({ ...movieEdit,
      hot: ((typeof movieEdit.hot) === "boolean") ? ((movieEdit.hot) ? "true" : "false") : movieEdit.hot,
      dangChieu: ((typeof movieEdit.dangChieu) === "boolean") ? ((movieEdit.dangChieu) ? "true" : "false") : movieEdit.dangChieu,
      sapChieu: ((typeof movieEdit.sapChieu) === "boolean") ? ((movieEdit.sapChieu) ? "true" : "false") : movieEdit.sapChieu,
    }));
  }, [movieEdit]);
  
  useEffect(() => {
    if (buttonTrigger && addMovieMessage !==null) {
      if (addMovieMessage === true && addMovieMessage !== undefined) {
        toast.success("Modify complete !!!");
      } 
      if (!(addMovieMessage)){
        toast.error("Cannot updated !!!");
      } 
      if (addMovieMessage === undefined) {
        toast.error("Cannot updated !!! No response from sever");
      }
      setButton(false);
    }
  }, [buttonTrigger, setButton, addMovieMessage, navigate]);

  const formIk = useFormik({
    initialValues: input,
    enableReinitialize: true,
    onSubmit: (value) => {
      const payload = {
        ...value,
        hot: (value.hot === "true"),
        dangChieu: (value.dangChieu === "true"),
        sapChieu: (value.sapChieu === "true"),
        ngayKhoiChieu: dayjs(value.ngayKhoiChieu).format("DD/MM/YYYY")
      }
      dispatch(submitEditMovie(payload));
      setButton(true);
    },
    validateOnMount: true,
    validationSchema: schema,
  })

  const handleGoBack = () => {
    navigate("/home/movies");
  };

  return (
    <div className="movieEdit">
      <div><Toaster/></div>
      <div className="movieEditContainer">
        <div className="top">
          <Controls.Button
            text="Go back"
            color="secondary"
            size="medium"
            startIcon={<KeyboardBackspaceIcon />}
            onClick={handleGoBack} 
          />
          <h1>Edit Movie</h1>
        </div>
        <div className="bottom">
        <Form onSubmit={formIk.handleSubmit}>
          <Grid container>
            <Grid item xs={6}>
            <Controls.Input
                name="maPhim"
                label="Movie Id"
                value={formIk.values.maPhim}
                disabled
              />
              <Controls.Input
                name="tenPhim"
                label="Movie Name"
                value={formIk.values.tenPhim}
                onChange={formIk.handleChange}
                touched={formIk.touched.tenPhim}
                error = {formIk.errors.tenPhim}
              />
              <Controls.Input
                name="biDanh"
                label="Code Name"
                value={formIk.values.biDanh}
                onChange={formIk.handleChange}
                touched={formIk.touched.biDanh}
                error = {formIk.errors.biDanh}
              />
              <Controls.Input
                name="trailer"
                label="Trailer Link"
                value={formIk.values.trailer}
                onChange={formIk.handleChange}
                touched={formIk.touched.trailer}
                error = {formIk.errors.trailer}
              />
              <Controls.Input
                name="moTa"
                label="Description"
                value={formIk.values.moTa}
                onChange={formIk.handleChange}
                touched={formIk.touched.moTa}
                error = {formIk.errors.moTa}
              />
              <Controls.Input
                name="danhGia"
                label="Rate"
                value={formIk.values.danhGia}
                onChange={formIk.handleChange}
                touched={formIk.touched.danhGia}
                error = {formIk.errors.danhGia}
              />
              <div>
                  <Controls.Button
                      type="submit"
                      text="Update"
                      disabled={(!formIk.dirty)}
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
                  {(file === undefined) && <p style={{color: "red"}}>Image file is required</p>}                </div>                    
                <img
                  src={
                      file
                        ? URL.createObjectURL(file)
                        : formIk.values.hinhAnh
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
    </div>
  );
};

export default MovieEdit;
