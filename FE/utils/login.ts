import AsyncStorage from "@react-native-async-storage/async-storage";

// 로그인 정보를 저장하는 함수
export const saveLoginInfo = async (loginInfo: string) => {
  try {
    await AsyncStorage.setItem("@loginInfo", loginInfo);
    console.log("savelogin", loginInfo);
  } catch (error) {
    console.error("Error saving login info:", error);
  }
};

// 저장된 로그인 정보를 가져오는 함수
export const getLoginInfo = async () => {
  try {
    const loginInfo = await AsyncStorage.getItem("@loginInfo");
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
    await AsyncStorage.removeItem("@loginInfo");
    console.log("remove");
  } catch (error) {
    console.error("Error saving login info:", error);
  }
};
