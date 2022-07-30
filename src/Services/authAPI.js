import axiosClient from "./axiosClient";

const authAPI = {
  accountLogin : (account) => {
    return axiosClient.post("QuanLyNguoiDung/DangNhap",account);
  },
  
};

export default authAPI;