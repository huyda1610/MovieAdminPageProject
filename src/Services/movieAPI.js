import axiosClient from "./axiosClient";

const maNhom = "GP01";

const movieAPI = {
  getMovieShowing : () => {
    return axiosClient.get("QuanLyPhim/LayDanhSachPhim")
  },

  getMovieDetails : (movieId) => {
    return axiosClient.get("QuanLyPhim/LayThongTinPhim",{
      params: {
        maPhim: movieId,
      },
    });
  },

  deleteMovie: (movieId) => {
    return axiosClient.delete("QuanLyPhim/XoaPhim",{
      params: {
        MaPhim: movieId,
      },
    });
  },

  addNewMovie: (movie) => {
    const formData = new FormData();
    for (let key in movie) {
      formData.append(key, movie[key]);
    }
    formData.append("maNhom", maNhom);
    return axiosClient.post("QuanLyPhim/ThemPhimUploadHinh", formData);
  },

  submitEditMovie: (movie) => {
    const formData = new FormData();
    for (let key in movie) {
      formData.append(key, movie[key]);
    }
    return axiosClient.post("QuanLyPhim/CapNhatPhimUpload", formData)
  },

};

export default movieAPI;