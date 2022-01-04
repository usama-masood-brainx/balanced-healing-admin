import { postCall, authorizedPostCall } from "./APIsService";

export const isLoggedIn = () => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  if (!token || !refreshToken) {
    return false;
  }
  return true;
};

export const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    postCall("/auth/login", { email, password })
      .then((data) => {
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("refresh_token", data.refreshToken);
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const logout = async () => {
  return new Promise((resolve, reject) => {
    localStorage.setItem("access_token", "");
    localStorage.setItem("refresh_token", "");
    authorizedPostCall("/auth/logout", {
      token: localStorage.getItem("refresh_token"),
    })
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const refreshToken = async () => {
  return new Promise((resolve, reject) => {
    postCall("/auth/refresh-token", {
      token: localStorage.getItem("refresh_token"),
    })
      .then((data) => {
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("refresh_token", data.refreshToken);
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const verifyLogin = async () => {
  return new Promise((resolve, reject) => {
    !localStorage.getItem("refresh_token") && resolve(false);
    authorizedPostCall("/auth/verify-login")
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const resetPassword = (email) => {
  return new Promise((resolve, reject) => {
    postCall("/auth/forgot-password", { email })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const validateResetLink = (link) => {
  return new Promise((resolve, reject) => {
    postCall("/auth/validate-reset-link", { link })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const changePasswordWithLink = (password, link) => {
  return new Promise((resolve, reject) => {
    postCall("/auth/change-password-with-link", { link, password })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
