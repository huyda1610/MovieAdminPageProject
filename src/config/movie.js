import React from 'react'
export const movieColumn = [
  { field: "maPhim", headerName: "Movie ID", width: 80 },
  { field: "tenPhim", headerName: "Movie Name", width: 250 },
  {
    field: "hinhAnh",
    headerName: "Movie Image",
    width: 160,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.hinhAnh} alt="img"/>
        </div>
      );
    },
  },

  {
    field: "moTa",
    headerName: "Description",
    width: 500,
  },

];
