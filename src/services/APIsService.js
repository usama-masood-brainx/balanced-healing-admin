import axios from "axios";
import jwtDecode from "jwt-decode";
import { refreshToken } from "./authService";
const baseURL = process.env.REACT_APP_BACKEND_URL;

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

export const authorizedPutCall = async (url, data) => {
  return new Promise((resolve, reject) => {
    authorizedAxios
      .put(baseURL + url, data, {
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

export const authorizedDeleteCall = async (url) => {
  return new Promise((resolve, reject) => {
    authorizedAxios
      .delete(baseURL + url, {
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

export const authorizedGetCall = async (url) => {
  return new Promise((resolve, reject) => {
    authorizedAxios
      .get(baseURL + url, {
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
