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
import { kakao } from "./types/type";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "./screens/RegisterScreen";
import { useNavigation } from "@react-navigation/native";


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

type Props = {
  curScreenHandler: (screen: string) => void;
};

const StackNavigator = ({ curScreenHandler }: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerTitle: "",
        }}
        listeners={({ navigation, route }) => ({
          state: (e) => {
            // 화면 변경 시 currentScreen 상태 업데이트
            curScreenHandler(e.data.state.routes[e.data.state.index].name);
          },
        })}
      />
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
        listeners={({ navigation, route }) => ({
          state: (e) => {
            // 화면 변경 시 currentScreen 상태 업데이트
            curScreenHandler(e.data.state.routes[e.data.state.index].name);
          },
        })}
      />
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

type RegisterProps = {
  loginHandler: (logined: boolean) => void;
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
  const [login, setLogin] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("NAITE");
  const curScreenHandler = (screen: string) => {
    setCurrentScreen(screen);
  };

  useEffect(() => {
    const autoLogin = async () => {
      const loginInfo = await getLoginInfo();
      if (loginInfo) {
        try {
          const response: AxiosResponse<kakao> = await axios.post(
            "https://kauth.kakao.com/oauth/token",
            `grant_type=refresh_token&client_id=${KAKAO_REST_API}&refresh_token=${loginInfo}&client_secret=${KAKAO_CLIENT_SECRET}`,
            {
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded;charset=utf-8",
              },
            }
          );
          const newAccessToken = response.data;
          if (newAccessToken) loginHandler(true);
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      }
    };
    autoLogin();
  }, []);

  const loginHandler = (logined: boolean) => {
    setLogin(logined);
  };
  const handleRegister = () => {
    // 여기에 회원가입 로직을 구현
    // 예: 회원가입 성공 후 로그인 상태를 업데이트
    loginHandler(true);
  };
  
  return (
    <NavigationContainer>
      {login ? (
        <Drawer.Navigator
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
            {() => <StackNavigator curScreenHandler={curScreenHandler} />}
          </Drawer.Screen>
        </Drawer.Navigator>
      ) : (
        <StackNavigatorRegister loginHandler={loginHandler}/>
        //<LoginScreen loginHandler={loginHandler} />
        //<RegisterScreen registerHandler={handleRegister} />
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
