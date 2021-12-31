import { getCall } from "./APIsService";
import axios from "axios";

export const uploadFile = async (file) => {
  try {
    const url = await getCall("/aws/get-url");
    await axios.put(url, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return url.split("?")[0];
  } catch (err) {
    console.log(err);
  }
};
