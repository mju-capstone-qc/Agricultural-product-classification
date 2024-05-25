import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, TextInput, Text, View, TouchableOpacity, Alert} from "react-native";
import RegularButton from "../components/RegularButton";
import axios from 'axios';
import { URI } from "@env";
import { useNavigation } from "@react-navigation/native";

type Props = {
  // 회원가입 완료 후 로그인 상태를 업데이트하는 핸들러
  registerHandler: () => void;
};

const RegisterScreen = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false); // 이메일 중복 여부 상태
  const [passwordMatch, setPasswordMatch] = useState(true);
  //const [showEmailErrorMessage, setShowEmailErrorMessage] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false); // 이메일 중복 체크 자체를 했는지에 대한 상태
  const [allConditionsMet, setAllConditionsMet] = useState(false);

  const navigation = useNavigation(); // 네비게이션 객체 가져오기

  useEffect(() => {
    // 모든 조건이 만족되는지 확인
    if (name && email && password && confirmPassword && isEmailChecked && !isEmailDuplicate && password === confirmPassword) {
      setAllConditionsMet(true);
      setPasswordMatch(true)
    } else {
      setAllConditionsMet(false);
    }
  }, [name, email, password, confirmPassword, isEmailChecked, isEmailDuplicate]);

  const handleRegister = async() => {
    // 필수 입력값 유효성 검사
    if (!name || !email || !password || !confirmPassword) {
      console.log('모든 필수 입력값을 입력하세요.');
      return;
    }
    if (!isEmailChecked) {
      console.log('이메일 중복 확인을 먼저 진행해주세요.');
      setIsEmailChecked(false); // 이메일 중복 확인 했는지
      return;
    }
    // 이메일 중복 여부 확인
    if (isEmailDuplicate) {
      console.log('이메일이 중복되었습니다.');
      return;
    } 
    // 비밀번호 일치 여부 확인
    if (password !== confirmPassword) {
      console.log('비밀번호가 일치하지 않습니다.');
      setPasswordMatch(false);
      return;
    } else {
      setPasswordMatch(true);
    }
    
    try {
      // 회원가입 API 호출
      const response = await axios.post(`${URI}/register`, {
        name,
        email,
        password,
      });
  
      // 서버로부터 받은 응답에 따라 처리
      if (response.status === 200) {
        console.log(response.data.message); // 회원가입 성공
        Alert.alert(
          "회원가입 성공",
          "회원가입이 성공적으로 완료되었습니다.",
          [{ text: "확인", onPress: () => navigation.goBack() }] // 회원가입 성공 후 로그인 화면으로 이동
        );
      } else {
        console.error(response.data.error); // 회원가입 실패
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
  // 이메일 입력란 아래에 출력될 메시지
  const emailErrorMessage = !isEmailChecked ? (
  <Text style={styles.errorMessage}>이메일 중복 확인을 먼저 진행해주세요.</Text>
  ) : null;

  const handleCheckDuplicate = async () => {
    try {
      const response = await axios.post('http://192.168.11.144:3000/checkDuplicateEmail', {
        email: email // 사용자가 입력한 이메일
      });
      if (response.data.isDuplicate) {
        console.log('중복된 이메일입니다.');
        setIsEmailChecked(true); // 이메일 중복 체크했는지 확인 상태 업데이트
        setIsEmailDuplicate(response.data.isDuplicate); // 중복 여부 상태 업데이트
      } else {
        console.log('사용 가능한 이메일입니다.');
        setIsEmailChecked(true); // 이메일 중복 체크했는지 확인 상태 업데이트
        setIsEmailDuplicate(response.data.isDuplicate); // 중복 여부 상태 업데이트
      }
    } catch (error) {
      console.error('이메일 중복 확인에 실패했습니다.', error);
    }
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
            <TouchableOpacity onPress={handleCheckDuplicate} style={[styles.checkButton, isEmailChecked&&!isEmailDuplicate ? styles.duplicateCheckButton : null]}>
              <Text style={styles.checkButtonText}>중복 확인</Text>
            </TouchableOpacity>
          </View>
          {emailErrorMessage}
          {isEmailDuplicate && (
            <Text style={styles.errorMessage}>이메일이 중복되었습니다.</Text>
          )}
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
          {!passwordMatch && <Text style={styles.errorMessage}>비밀번호가 일치하지 않습니다.</Text>}
        </View>
        <View style={styles.registerButtonContainer}>
          <RegularButton
            color={allConditionsMet ? "#42AF4D" : "#ACB7C3"}
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
    backgroundColor: "#42AF4D",
    height: 30,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    right: 10, // 우측에 정렬
    top: 20, // 상단에 정렬
  },
  duplicateCheckButton: {
    backgroundColor: "#ACB7C3", // 중복 확인 버튼 색상 변경
  },
  checkButtonText: {
    color: "white",
    fontSize: 12,
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },

});

export default RegisterScreen;
