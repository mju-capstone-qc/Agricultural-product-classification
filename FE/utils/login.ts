import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveLogin } from "../types/type";
import axios, { AxiosResponse } from "axios";
import { PYTHON_URI } from "@env";

// 로그인 정보를 저장하는 함수
export const saveLoginInfo = async (loginInfo: saveLogin) => {
  try {
    await AsyncStorage.setItem("@platform", loginInfo.platform);
    if (loginInfo.platform === "kakao" && loginInfo.refresh) {
      await AsyncStorage.setItem("@refresh", loginInfo.refresh);
    } else if (loginInfo.platform === "local" && loginInfo.email) {
      await AsyncStorage.setItem("@email", loginInfo.email);
    }
    console.log("savelogin", loginInfo);
  } catch (error) {
    console.error("Error saving login info:", error);
  }
};

// 저장된 로그인 정보를 가져오는 함수
export const getLoginInfo = async () => {
  try {
    const platform = await AsyncStorage.getItem("@platform");
    if (!platform) return;
    const loginInfo: saveLogin = { platform: platform };
    if (platform === "kakao") {
      const refresh = await AsyncStorage.getItem("@refresh");
      if (!refresh) return;
      loginInfo.refresh = refresh;
    } else if (platform === "local") {
      const email = await AsyncStorage.getItem("@email");
      const id = await axios
        .post(`${PYTHON_URI}/autoLogin`, {
          email: email || "",
        })
        .then(
          (res: AxiosResponse<{ success: boolean; user_email: string }>) =>
            res.data
        );
      console.log(id);
      if (!email) return;
      if (!id.success || email !== id.user_email) {
        await AsyncStorage.removeItem("@email");
        return;
      }
      loginInfo.email = email;
    }
    console.log("byby", loginInfo);
    if (loginInfo !== null) {
      return loginInfo;
    }
  } catch (error) {
    console.error("Error getting login info:", error);
  }
};

// 로그아웃 정보를 저장하는 함수
export const saveLogoutInfo = async () => {
  try {
    const platform = await AsyncStorage.getItem("@platform");
    if (platform === "kakao") {
      await AsyncStorage.removeItem("@refresh");
    }
    if (platform === "local") {
      await AsyncStorage.removeItem("@email");
    }
    await AsyncStorage.removeItem("@platform");
    console.log("remove");
  } catch (error) {
    console.error("Error saving login info:", error);
  }
};
