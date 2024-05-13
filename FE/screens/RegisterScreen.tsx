import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, TextInput, Text, View, TouchableOpacity} from "react-native";
import RegularButton from "../components/RegularButton";
import axios from 'axios';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/routers";


type Props = {
  // 회원가입 완료 후 로그인 상태를 업데이트하는 핸들러
  registerHandler: () => void;
  navigation: NativeStackNavigationProp<ParamListBase, "Register">;

};

const RegisterScreen = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  
  const handleRegister = async() => {
    // 필수 입력값 유효성 검사
    if (!name || !email || !password || !confirmPassword) {
      console.log('모든 필수 입력값을 입력하세요.');
      return;
    }
    // 비밀번호 일치 여부 확인
    if (password !== confirmPassword) {
      console.log('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    try {
      // 회원가입 API 호출
      const response = await axios.post('http://localhost:3306/register', {
        name,
        email,
        password,
      });
  
      // 서버로부터 받은 응답에 따라 처리
      if (response.status === 200) {
        console.log(response.data.message); // 회원가입 성공
        // 회원가입 성공 후 로그인 화면으로 이동
        //navigation.navigate("Login");
      } else {
        console.error(response.data.error); // 회원가입 실패
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleCheckDuplicate = () => {
    // 이메일 중복 확인 로직을 구현합니다.
    // 필요에 따라 이메일 유효성 검사를 추가할 수 있습니다.
    // 중복확인 버튼을 눌렀을 때 이메일 중복 여부를 확인하고,
    // 결과에 따라 사용자에게 알림을 표시할 수 있습니다.
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/logo_no_title.png")}
        />
        <Text style={styles.welcomeText}>Welcome to NAITE</Text>
        <Text style={styles.signUpText}>Sign Up</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.registerContainer}>
          <TextInput
            style={styles.input}
            placeholder="이름을 입력하세요." // 이름을 입력받는 TextInput
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
          />
          <View style={styles.emailInputContainer}>
            <TextInput
              style={styles.emailInput}
              placeholder="아이디(이메일)를 입력하세요."
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TouchableOpacity onPress={handleCheckDuplicate} style={styles.checkButton}>
              <Text style={styles.checkButtonText}>중복 확인</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 다시 입력하세요."
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.registerButtonContainer}>
          <RegularButton
            color="#ACB7C3"
            onPress={handleRegister}
          >
            SIGN UP
          </RegularButton>
        </View>
      </View>
    </ScrollView>
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
  registerContainer: {
    flex: 1,
    paddingTop: "10%",
    alignItems: "center",
    width: "100%",
  },
  registerButtonContainer: {
    flex: 2,
    alignItems: "center",
    marginTop: 40,
  },
  image: {
    width: 150,
    height: 140,
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
  welcomeText: {
    fontSize: 16,
    //fontWeight: "bold",
    marginTop: -20,
    color: "#808080", 
  },
  signUpText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    color: "#42AF4D",
  },
  emailInputContainer: {
    position: "relative",
    width: "85%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  emailInput: {
    height: 50,
    width: "100%",
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: "left",
    paddingLeft: 15,
    margin: 10,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
  },
  checkButton: {
    position: "absolute",
    backgroundColor: "#ACB7C3",
    height: 30,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    right: 10, // 우측에 정렬
    top: 20, // 상단에 정렬
  },
  checkButtonText: {
    color: "white",
    fontSize: 12,
  },
});

export default RegisterScreen;
