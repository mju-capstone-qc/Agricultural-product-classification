import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen";
import { Image, Text, View, StyleSheet } from "react-native";
import ResultScreen from "./screens/ResultScreen";
import { useEffect, useState } from "react";
import { getLoginInfo } from "./utils/login";
import axios, { AxiosResponse } from "axios";
import { KAKAO_CLIENT_SECRET, KAKAO_REST_API } from "@env";
import { kakao } from "./types/type";

const Drawer = createDrawerNavigator();

export default function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const autoLogin = async () => {
      const loginInfo = await getLoginInfo();
      if (loginInfo) {
        const response: AxiosResponse<kakao> = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          `grant_type=refresh_token&client_id=${KAKAO_REST_API}&refresh_token=${loginInfo}&client_secret=${KAKAO_CLIENT_SECRET}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        );
        const newAccessToken = response.data;
        if (newAccessToken) loginHandler(true);
      }
    };
    autoLogin();
  }, []);

  const loginHandler = (logined: boolean) => {
    setLogin(logined);
  };
  return (
    <>
      <NavigationContainer>
        {login ? (
          <Drawer.Navigator
            screenOptions={{
              headerTitleAlign: "center",
              drawerItemStyle: { backgroundColor: "white" },
              drawerActiveTintColor: "#27C077",
              headerTintColor: "black",
            }}
          >
            <Drawer.Screen
              name="NAITE"
              component={HomeScreen}
              options={{
                headerTitle: () => (
                  <View style={styles.title}>
                    <Text style={styles.titleText}>NAITE</Text>
                    <Image
                      style={styles.logo}
                      source={require("./assets/images/logo_no_title.png")}
                    />
                  </View>
                ),
                title: "진단하기",
              }}
            />
            <Drawer.Screen
              name="Result"
              component={ResultScreen}
              options={{
                headerTitle: () => (
                  <View style={styles.title}>
                    <Text style={styles.titleText}>진단 확인하기</Text>
                    <Image
                      style={styles.logo}
                      source={require("./assets/images/logo_no_title.png")}
                    />
                  </View>
                ),
                title: "진단하기",
              }}
            />
          </Drawer.Navigator>
        ) : (
          <LoginScreen loginHandler={loginHandler} />
        )}
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  logo: {
    width: 30,
    height: 30,
  },
  header: {
    margin: 0,
  },
});
