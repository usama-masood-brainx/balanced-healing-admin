import { authorizedPostCall } from "./APIsService";
import axios from "axios";

export const uploadFile = async (file, folder) => {
  try {
    const url = await authorizedPostCall("/aws/get-url", { folder });
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
