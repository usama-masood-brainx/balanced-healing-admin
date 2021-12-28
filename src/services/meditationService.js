import { getCall } from "./APIsService";

export const fetchAll = async () => {
  return new Promise((resolve, reject) => {
    getCall("/meditation")
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
