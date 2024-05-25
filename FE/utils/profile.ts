import axios, { AxiosResponse } from "axios";
import { PYTHON_URI } from "@env";
import { profile } from "../types/type";

export const getProfile = async (email: string) => {
  console.log(PYTHON_URI);
  try {
    const profile = await axios
      .post(`${PYTHON_URI}/profile`, {
        email: email,
      })
      .then((res: AxiosResponse<profile>) => res.data);
    return profile;
  } catch (error) {
    console.log("Error getting profile: ", error);
  }
};

export const editName = async (email: string, name: string) => {
  console.log(PYTHON_URI);
  try {
    await axios.post(`${PYTHON_URI}/editName`, {
      email: email,
      name: name,
    });
  } catch (error) {
    console.log("Error modify name: ", error);
  }
};

export const editPassword = async (email: string, password: string) => {
  console.log(PYTHON_URI);
  try {
    await axios.post(`${PYTHON_URI}/editPassword`, {
      email: email,
      password: password,
    });
  } catch (error) {
    console.log("Error modify password: ", error);
  }
};

export const deleteAccount = async (email: string) => {
  console.log(PYTHON_URI);
  try {
    await axios.post(`${PYTHON_URI}/deleteAccount`, {
      email: email,
    });
  } catch (error) {
    console.log("Error modify password: ", error);
  }
};
