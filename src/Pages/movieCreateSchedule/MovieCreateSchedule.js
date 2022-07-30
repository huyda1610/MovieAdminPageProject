import "./movieCreateSchedule.scss";
import React, { useEffect } from 'react';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMovieDetails } from "../../Slices/movie";
import { getTheaterInfo,getBoxOfficeInfo, createMovieSchedule } from "../../Slices/theater";

import Controls from "../../Components/controls/Controls";
import {Form } from '../../Components/useForm';
import dayjs from "dayjs";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Box from '@mui/material/Box';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Loading from '../../Components/loading/Loading';

const initialValues = {
  maPhim: 0,
  ngayChieuGioChieu: new Date(),
  maRap: "",
  giaVe: 75000,
  tenRap: "",
}

const schema = yup.object({
  giaVe: yup.number()
    .required("This field is required")
    .min(75000, "Minimum at least 75000")
    .max(200000, "Allowed maximum is 200000"),
  maRap: yup.string()
    .required("This field is required"),
  tenRap: yup.string()
    .required("This field is required"),
});

const MovieCreateSchedule = () => {
  const { movieEdit, movieId, movieIsLoading } = useSelector(
    (state) => state.movie
  );
  const { theater, boxOfficeInfo, scheduleIsSuccess } = useSelector(
    (state) => state.theater
  );

  const [buttonTrigger, setButton]= useState(false);

  const {id} = useParams(movieId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMovieDetails(id));
    dispatch(getTheaterInfo());
  }, []);
  useEffect(() => {
    if (buttonTrigger && scheduleIsSuccess !==null) {
      if (scheduleIsSuccess === true) {
        toast.success("Create complete !!!");
        setButton(false);
      } else {
        toast.error("Cannot created !!!");
        setButton(false);
      }
    }
  }, [buttonTrigger, setButton, scheduleIsSuccess]);

  const formIk = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (value) => {
      const payload = {       
        maPhim: Number(id),
        maRap: value.maRap,
        giaVe: Number(value.giaVe),
        ngayChieuGioChieu: dayjs(value.ngayChieuGioChieu).format("DD/MM/YYYY hh:mm:ss")
      }
      dispatch(createMovieSchedule(payload));
      setButton(true);
    },
    validateOnMount: true,
    validationSchema: schema
  })

  useEffect(() => {
    dispatch(getBoxOfficeInfo(formIk.values.tenRap));
  }, [dispatch,formIk.values.tenRap ]);

  const handleGoBack = () => {
    navigate("/home/movies");
  };

  if (movieIsLoading) {
    return <Loading/>
  };

  return (
    <div className="movieSchedule">
      <div><Toaster/></div>
      <div className="movieScheduleContainer">
        <div className="top">
          <Controls.Button
            text="Go back"
            color="secondary"
            size="medium"
            startIcon={<KeyboardBackspaceIcon />}
            onClick={handleGoBack} 
          />
          <h1>Create Schedule</h1>
        </div>
        <div className="bottom">
        <Form onSubmit={formIk.handleSubmit}>
          <div className="Img">
            <h1>{movieEdit.tenPhim} - {movieEdit.maPhim}</h1>
            <img
              src={movieEdit.hinhAnh}
                alt=""
                width="300px"
                height="300px"
            />          
          </div>
          <Box
            sx={{
              width: 900,
              height: 363,
            }}
          >
          <Controls.TheaterSelect
            name="tenRap"
            label="Theater Name"
            value={formIk.values.tenRap}
            onChange={formIk.handleChange}
            onblur={formIk.handleBlur}
            options={theater}
            touched={formIk.touched.tenRap}
            error = {formIk.errors.tenRap}
          />
          <Controls.BoxOfficeSelect
            name="maRap"
            label="Box Office Location"
            value={formIk.values.maRap}
            onChange={formIk.handleChange}
            onblur={formIk.handleBlur}
            options={(formIk.values.tenRap !== "") && (Array.isArray(boxOfficeInfo)) && boxOfficeInfo}
            touched={formIk.touched.maRap}
            error = {formIk.errors.maRap}
            disabled={formIk.values.tenRap === ""}
          />
          <Controls.DateTimePicker
              name="ngayChieuGioChieu"
              label="Show time"
              onChange={formIk.handleChange}
              value= {formIk.values.ngayChieuGioChieu}
          />
          <Controls.Input
            name="giaVe"
            label="Ticket Price"
            value={formIk.values.giaVe}
            onChange={formIk.handleChange}
            onblur={formIk.handleBlur}
            touched={formIk.touched.giaVe}
            error = {formIk.errors.giaVe}
          />
          <div>
            <Controls.Button
                type="submit"
                text="Create"
            />
          </div>
          </Box>
          
        </Form>
        </div>
      </div>
    </div>
  );
}

export default MovieCreateSchedule