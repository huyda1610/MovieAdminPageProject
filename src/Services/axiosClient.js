import axios from "axios";

const accessKey = localStorage.getItem('accessToken');

const axiosClient = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzEiLCJIZXRIYW5TdHJpbmciOiIyOS8xMi8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NzIyNzIwMDAwMDAiLCJuYmYiOjE2NDU5ODEyMDAsImV4cCI6MTY3MjQxOTYwMH0.SZe3CJl1OkNH-0zfzqOV0CSC8WZ6q2hw64UykpCytT0",
  },
});

axiosClient.interceptors.response.use(
  (response) => {
    return response.data.content;
  },
  (error) => {
    return error.response.data.content;
  }
);

axiosClient.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${accessKey}`;
  }
  return config;

});

export default axiosClient;