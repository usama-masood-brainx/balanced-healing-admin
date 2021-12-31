import {
  getCall,
  postCall,
  authorizedDeleteCall,
  authorizedPostCall,
  authorizedPutCall,
} from "./APIsService";

export const fetchAll = async (body) => {
  return new Promise((resolve, reject) => {
    postCall("/meditation", body)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export const fetchOne = async (id) => {
  return new Promise((resolve, reject) => {
    getCall(`/meditation/${id}`)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export const update = async (id, body) => {
  return new Promise((resolve, reject) => {
    authorizedPutCall(`/meditation/${id}`, body)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export const add = async (body) => {
  return new Promise((resolve, reject) => {
    authorizedPostCall(`/meditation/add`, body)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export const remove = async (id) => {
  return new Promise((resolve, reject) => {
    authorizedDeleteCall(`/meditation/${id}`)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
