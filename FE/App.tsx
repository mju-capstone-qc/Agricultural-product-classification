import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import ResultScreen from "./screens/ResultScreen";
import { useEffect, useState } from "react";
import { getLoginInfo } from "./utils/login";
import axios, { AxiosResponse } from "axios";
import { KAKAO_CLIENT_SECRET, KAKAO_REST_API, URI } from "@env";
import { kakao, login } from "./types/type";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "./screens/RegisterScreen";
import CustomDrawerContent from "./components/CustomDrawerContent";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

type Props = {
  curScreenHandler: (screen: string) => void;
  login: login;
};

const StackNavigator = ({ curScreenHandler, login }: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
          headerTitle: "",
        }}
        listeners={() => ({
          state: (e) => {
            // 화면 변경 시 currentScreen 상태 업데이트
            curScreenHandler(e.data.state.routes[e.data.state.index].name);
          },
        })}
      >
        {() => <HomeScreen login={login} />}
      </Stack.Screen>
      <Stack.Screen
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
        }}
        listeners={() => ({
          state: (e) => {
            // 화면 변경 시 currentScreen 상태 업데이트
            curScreenHandler(e.data.state.routes[e.data.state.index].name);
          },
        })}
      />
    </Stack.Navigator>
  );
};

type RegisterProps = {
  loginHandler: (platform: string, email: string) => void;
};

const StackNavigatorRegister = ({ loginHandler }: RegisterProps) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name="Login"
        options={{
          headerShown: false,
          headerTitle: "",
        }}
      >
        {() => <LoginScreen loginHandler={loginHandler} />}
      </Stack.Screen>
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [login, setLogin] = useState<login | null>(null);
  const [currentScreen, setCurrentScreen] = useState("NAITE");
  const curScreenHandler = (screen: string) => {
    setCurrentScreen(screen);
  };

  useEffect(() => {
    const autoLogin = async () => {
      const loginInfo = await getLoginInfo();
      if (loginInfo?.platform === "kakao") {
        try {
          const response: AxiosResponse<kakao> = await axios.post(
            "https://kauth.kakao.com/oauth/token",
            `grant_type=refresh_token&client_id=${KAKAO_REST_API}&refresh_token=${loginInfo.refresh}&client_secret=${KAKAO_CLIENT_SECRET}`,
            {
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded;charset=utf-8",
              },
            }
          );
          const newAccessToken = response.data;
          console.log(newAccessToken);
          // if (newAccessToken) loginHandler("kakao");
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      }

      if (loginInfo?.platform === "local" && loginInfo.email) {
        console.log("자동로그인");
        setLogin({ platform: "local", email: loginInfo.email });
      }
    };
    autoLogin();
  }, []);

  const loginHandler = (platform: string, email: string) => {
    setLogin({ platform: platform, email: email });
  };

  return (
    <NavigationContainer>
      {login ? (
        <Drawer.Navigator
          drawerContent={(props) => (
            <CustomDrawerContent {...props} setLogin={setLogin} />
          )} // 커스텀 드로어 콘텐츠 사용
          screenOptions={{
            headerShown: currentScreen !== "Result",
            headerTitleAlign: "center",
            drawerItemStyle: { backgroundColor: "white" },
            drawerActiveTintColor: "#27C077",
            headerTintColor: "black",
          }}
          initialRouteName="NAITE"
        >
          <Drawer.Screen
            name="NAITE"
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
              drawerLabel: "진단하기",
            }}
          >
            {() => (
              <StackNavigator
                login={login}
                curScreenHandler={curScreenHandler}
              />
            )}
          </Drawer.Screen>
        </Drawer.Navigator>
      ) : (
        <StackNavigatorRegister loginHandler={loginHandler} />
      )}
    </NavigationContainer>
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
