import axiosClient from "./axiosClient";
const maNhom = "GP01";

const userAPI = {
  getUserShowing : () => {
    return axiosClient.get("QuanLyNguoiDung/LayDanhSachNguoiDung")
  },

  getUserDetails : (account) => {
    return axiosClient.post(`QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${account}`);
  },

  deleteUser : (account) => {
    return axiosClient.delete("QuanLyNguoiDung/XoaNguoiDung",{
      params: {
        TaiKhoan: account,
      },
    });
  },

  addNewUser: (user) => {
    const payload = {...user, maNhom: maNhom};
    return axiosClient.post("QuanLyNguoiDung/ThemNguoiDung", payload);
  },

  submitEditUser: (user) => {
    return axiosClient.post("QuanLyNguoiDung/CapNhatThongTinNguoiDung", user);
  }
};

export default userAPI;