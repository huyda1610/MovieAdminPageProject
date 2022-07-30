import React, { useEffect } from 'react'
import "./movies.scss";
import { DataGrid } from "@mui/x-data-grid";
import { movieColumn } from "../../config/movie";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getMovieShowing, deleteMovie } from '../../Slices/movie';
import { getMovieId } from '../../Slices/movie';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import Loading from '../../Components/loading/Loading';

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

const Movies = () => {
  const { movies, deleteMessage, movieIsLoading } = useSelector(
    (state) => state.movie
  );

  const [deleteTrigger, setDeleteTrigger]= useState(null);

  const [input, setInput] = useState(initialValues);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMovieShowing());
  }, []);

  useEffect(() => {
    setInput(movies);
  }, [movies]);

  useEffect(() => {
    if (deleteTrigger !== null) {
      if (typeof deleteMessage === "string") {
        toast.success("Delete complete !!!");
        const currentInput = input;
        setInput(currentInput.filter((item) => item.maPhim !== deleteTrigger));
        setDeleteTrigger(null);
      } 
      if (deleteMessage === undefined) {
        toast.error("Cannot delete movie !!! Please try again");
        setDeleteTrigger(null);
      }
    }
  }, [deleteMessage, deleteTrigger, movies, input]);
  const handleEdit = (movieId) => {
    dispatch(getMovieId(movieId));
    navigate(`edit/${movieId}`);
  };

  const handleDelete = (movieId) => {
    setDeleteTrigger(movieId);
    dispatch(deleteMovie(movieId));
  }

  const handleCreateSchedule = (movieId) => {
    dispatch(getMovieId(movieId));
    navigate(`schedule/${movieId}`);
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 270,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div 
              className="editButton" 
              onClick={() => handleEdit(params.row.maPhim)}
            >Details</div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.maPhim)}
            >
              Delete
            </div>
              <div 
                className="createButton"
                onClick={() => handleCreateSchedule(params.row.maPhim)}
              >Create Schedule</div>
          </div>
        );
      },
    },
  ];

  if (movieIsLoading) {
    return <Loading/>;
  }

  return (
    <div className="movies">
      <div><Toaster/></div>
      <div className="moviesListTitle">
        Movie
        <Link to="/home/movies/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        getRowId={(row) => row.maPhim}
        className="datagrid"
        rows={input || movies}
        columns={movieColumn.concat(actionColumn)}
        pageSize={3}
        rowsPerPageOptions={[9]}
        checkboxSelection
        rowHeight={200}
        autoHeight
      />
    </div>
  );
};

export default Movies;
