import axiosClient from "./axiosClient";

const theaterAPI = {
  getTheaterInfo : () => {
    return axiosClient.get("QuanLyRap/LayThongTinHeThongRap");
  },

  getBoxOfficeInfo : (theaterId) => {
    return axiosClient.get("QuanLyRap/LayThongTinCumRapTheoHeThong",{
      params: {
        maHeThongRap: theaterId,
      },
    });
  },

  createMovieSchedule : (schedule) => {
    return axiosClient.post("QuanLyDatVe/TaoLichChieu",schedule);
  },
};

export default theaterAPI;