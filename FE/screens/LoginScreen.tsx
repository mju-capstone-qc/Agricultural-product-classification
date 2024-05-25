import { useRef, useState } from "react";
import {
  Button,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import RegularButton from "../components/RegularButton";
import KakaoLogin from "../components/KakaoLogin";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { PYTHON_URI } from "@env";
import { saveLoginInfo } from "../utils/login";
import ErrorModal from "../components/ErrorModal";

type props = {
  loginHandler: (platform: string, email: string) => void;
};

const LoginScreen = ({ loginHandler }: props) => {
  const [kakao, setKakao] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [modal, setModal] = useState(false);

  const navigation = useNavigation();

  const localLoginHandler = async () => {
    if (!email || !password) {
      setModal(true);
      return;
    }

    try {
      console.log(`로그인 요청: ${email}, ${password}`);
      const response = await axios.post(`${PYTHON_URI}/login`, {
        email: email,
        password: password,
      });
      console.log("로그인 응답:", response.data);
      if (response.status === 200 && response.data.exist === 1) {
        loginHandler("local", email);
        saveLoginInfo({ platform: "local", email: email });
      } else if (response.status === 200 && response.data.exist === 0) {
        setModal(true);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setHidden = () => {
    setModal(false);
  };
  return (
    <>
      {kakao ? (
        <KakaoLogin loginHandler={loginHandler} />
      ) : (
        <ScrollView style={styles.container}>
          <ErrorModal
            visible={modal}
            setHidden={setHidden}
            text={"이메일 또는 패스워드를 확인해주세요!"}
          />
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../assets/images/logo.png")}
            />
          </View>
          <View style={styles.mainContainer}>
            <View style={styles.loginContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                placeholder="password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.loginButtonContainer}>
              <RegularButton
                color="#42AF4D"
                onPress={() => {
                  console.log("login!!");
                  console.log(email);
                  localLoginHandler();
                }}
              >
                CONTINUE
              </RegularButton>
              <RegularButton
                color="#FAE36D"
                onPress={() => {
                  setKakao(true);
                }}
              >
                Login with Kakao
              </RegularButton>
              <RegularButton
                color="#ACB7C3"
                onPress={() => {
                  navigation.navigate("Register" as never);
                  console.log("Sign up");
                }}
              >
                Sign up
              </RegularButton>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "20%",
  },
  mainContainer: {
    flex: 2,
    width: "100%",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  loginContainer: {
    flex: 1,
    paddingTop: "10%",
    alignItems: "center",
    width: "100%",
  },
  loginButtonContainer: {
    flex: 2,
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 220,
    height: 200,
  },
  input: {
    height: 50,
    width: "85%",
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: "left",
    paddingLeft: 15,
    margin: 10,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
  },
  button: {
    width: "85%",
    height: 50,
  },
});

export default LoginScreen;
