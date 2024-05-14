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
import { URI } from "@env";
import { saveLoginInfo } from "../utils/login";

type props = {
  loginHandler: (logined: string) => void;
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
      const response = await axios.post(`${URI}/login`, {
        email: email,
        password: password,
      });
      if (response.status === 200 && response.data.exist === 1) {
        loginHandler(email);
        saveLoginInfo({ platform: "local", email: email });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {kakao ? (
        <KakaoLogin loginHandler={loginHandler} />
      ) : (
        <ScrollView style={styles.container}>
          <Modal visible={modal} animationType="fade" transparent={true}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={{ margin: 8 }}>
                  이메일 또는 패스워드를 확인해주세요!
                </Text>
                <View style={{ width: "100%" }}>
                  <Button
                    title="확인"
                    onPress={() => {
                      setModal(false);
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명 배경
  },
  modalContainer: {
    justifyContent: "space-around",
    height: "20%",
    width: "70%", // 원하는 너비 설정
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
});

export default LoginScreen;
