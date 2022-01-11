import { authorizedPostCall } from "./APIsService";
import axios from "axios";

export const uploadFile = async (file, key) => {
  try {
    const url = await authorizedPostCall("/aws/get-url", { key });
    await axios.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
    return url.split("?")[0];
  } catch (err) {
    console.log(err);
  }
};
