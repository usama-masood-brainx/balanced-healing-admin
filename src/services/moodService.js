import { postCall, authorizedPutCall, authorizedPostCall, authorizedDeleteCall } from "./APIsService";

export const fetchAll = async (body) => {
  return new Promise((resolve, reject) => {
    postCall("/mood", body)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export const update = async (id, body) => {
  return new Promise((resolve, reject) => {
    authorizedPutCall(`/mood/${id}`, body)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export const add = async (body) => {
  return new Promise((resolve, reject) => {
    authorizedPostCall(`/mood/add`, body)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export const remove = async (id) => {
  return new Promise((resolve, reject) => {
    authorizedDeleteCall(`/mood/${id}`)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
