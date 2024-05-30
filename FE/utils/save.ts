import axios, { AxiosResponse } from "axios";
import { PYTHON_URI } from "@env";

export const saveResult = async (
  url: string,
  email: string,
  product_id: number,
  predicted_class: 0 | 1 | 2,
  date: string
) => {
  console.log(PYTHON_URI);
  console.log(url, email, product_id, predicted_class);
  try {
    const save = await axios
      .post(`${PYTHON_URI}/save`, {
        url: url,
        email: email,
        product_id: product_id,
        predicted_class: predicted_class,
        date: date,
      })
      .then((res: AxiosResponse<{ success: boolean }>) => res.data);
    return save.success;
  } catch (error) {
    console.log("Error setting save: ", error);
  }
};
