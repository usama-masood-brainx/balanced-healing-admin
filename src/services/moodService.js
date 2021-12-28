import { getCall } from "./APIsService";

export const fetchAll = async () => {
  return new Promise((resolve, reject) => {
    getCall("/mood")
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
