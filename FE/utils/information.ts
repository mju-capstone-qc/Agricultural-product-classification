import axios, { AxiosResponse } from "axios";
import { URI } from "@env";
import { info } from "../types/type";

export const getInfo = async (label: string) => {
  try {
    const info = await axios
      .post(`${URI}/info`, {
        label: label,
      })
      .then((res: AxiosResponse<info>) => res.data);
    return info.efficacy;
  } catch (error) {
    console.log("Error getting info: ", error);
  }
};

export const getTip = async (label: string) => {
  try {
    const info = await axios
      .post(`${URI}/info`, {
        label: label,
      })
      .then((res: AxiosResponse<info>) => res.data);
    console.log(info);
    return info.select_tip;
  } catch (error) {
    console.log("Error getting info: ", error);
  }
};
