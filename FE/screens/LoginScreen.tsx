import { useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, TextInput, View } from "react-native";
import RegularButton from "../components/RegularButton";
import KakaoLogin from "../components/KakaoLogin";
import { useNavigation } from '@react-navigation/native';

type props = {
  loginHandler: (logined: boolean) => void;
};

const LoginScreen = ({ loginHandler }: props) => {
  const [kakao, setKakao] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  
  const navigation = useNavigation();
  
  return (
    <>
      {kakao ? (
        <KakaoLogin loginHandler={loginHandler} />
      ) : (
        <ScrollView style={styles.container}>
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
                ref={emailRef}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                placeholder="password"
                secureTextEntry={true}
                ref={passwordRef}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.loginButtonContainer}>
              <RegularButton color="#42AF4D" onPress={() => {}}>
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
                  //@ts-ignore
                  navigation.navigate('Register'); // Register 화면으로 이동
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
