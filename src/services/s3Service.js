import { authorizedGetCall } from "./APIsService";
import axios from "axios";

export const uploadFile = async (file) => {
  try {
    const url = await authorizedGetCall("/aws/get-url");
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
