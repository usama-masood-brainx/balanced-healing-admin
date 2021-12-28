import axios from "axios";
import jwtDecode from "jwt-decode";
import { refreshToken } from "./authService";
const baseURL = "http://localhost:5000";

const authorizedAxios = axios.create();

authorizedAxios.interceptors.request.use(
  async (config) => {
    const currentDate = new Date();
    const decodedToken = jwtDecode(localStorage.getItem("access_token"));
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const data = await refreshToken();
      config.headers["authorization"] = "Bearer" + data.accessToken;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const postCall = async (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(baseURL + url, data)
      .then((data) => {
        resolve(data.data);
      })
      .catch((err) => reject(err));
  });
};

export const getCall = async (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(baseURL + url)
      .then((data) => {
        resolve(data.data);
      })
      .catch((err) => reject(err));
  });
};

export const authorizedPostCall = async (url, data) => {
  return new Promise((resolve, reject) => {
    authorizedAxios
      .post(baseURL + url, data, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch((err) => reject(err));
  });
};
