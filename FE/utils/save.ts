import axios, { AxiosResponse } from "axios";
import { URI } from "@env";

export const saveResult = async (
  url: string,
  email: string,
  product_id: number,
  predicted_class: 0 | 1 | 2
) => {
  console.log(URI);
  try {
    const save = await axios
      .post(`${URI}/save`, {
        url: url,
        email: email,
        product_id: product_id,
        predicted_class: predicted_class,
      })
      .then((res: AxiosResponse<{ success: boolean }>) => res.data);
    return save.success;
  } catch (error) {
    console.log("Error setting save: ", error);
  }
};
