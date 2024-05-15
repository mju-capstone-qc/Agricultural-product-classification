import axios, { AxiosResponse } from "axios";
import { URI } from "@env";
import { resultType } from "../types/type";

export const getHistory = async (email: string) => {
  console.log(URI);
  try {
    const info = await axios
      .post(`${URI}/history`, {
        email: email,
      })
      .then((res: AxiosResponse<resultType[]>) => res.data);
    return info;
  } catch (error) {
    console.log("Error getting info: ", error);
  }
};
