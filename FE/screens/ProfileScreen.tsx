import {
  Button,
  Image,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RegularButton from "../components/RegularButton";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  deleteAccount,
  editName,
  editPassword,
  getProfile,
} from "../utils/profile";
import { login, profile } from "../types/type";
import ErrorModal from "../components/ErrorModal";
import { saveLogoutInfo } from "../utils/login";

type Props = {
  email: string;
  setLogin: React.Dispatch<React.SetStateAction<login | null>>;
};

const ProfileScreen = ({ email, setLogin }: Props) => {
  const [profile, setProfile] = useState<profile>();
  const [modal, setModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState<string>();
  const [text, setText] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        try {
          const fetchedProfile = await getProfile(email);
          console.log(fetchedProfile);
          setProfile(fetchedProfile);
          setName(fetchedProfile?.name);
        } catch (error) {
          console.log(error);
        }
      };
      fetchProfile();
    }, [email])
  );

  const handleModifyName = async () => {
    if (name) {
      editName(email, name);
    }
    if (!name) {
      setModal(true);
      setText("이름을 입력해주세요!");
    }
  };
  const handleModifyPassword = async () => {
    if (name && password && password === confirmPassword) {
      editPassword(email, password);
    }
    if (!password || password !== confirmPassword) {
      setModal(true);
      setText("비밀번호를 확인해주세요!");
    }
  };

  const setHidden = () => {
    setModal(false);
  };

  const deleteAccountHandler = () => {
    deleteAccount(email);
    setLogin(null);
    saveLogoutInfo();
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <ErrorModal visible={modal} setHidden={setHidden} text={text} />
      <View style={{ flex: 1 }}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/images/logo_no_title.png")}
          />
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.profileContainer}>
            <View style={styles.nameInputContainer}>
              <TextInput
                style={styles.nameInput}
                placeholder="이름을 입력하세요."
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.nameModifyButton}
                onPress={handleModifyName}
              >
                <Text style={styles.nameModifyButtonText}>이름 변경</Text>
              </TouchableOpacity>
            </View>
            <TextInput style={styles.input} value={email} editable={false} />

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
            <View style={styles.profileButtonContainer}>
              <RegularButton color="#ACB7C3" onPress={handleModifyPassword}>
                회원정보 변경
              </RegularButton>
              <RegularButton
                color="#f29999"
                onPress={() => {
                  setVisible(true);
                }}
              >
                회원 탈퇴
              </RegularButton>
            </View>
          </View>
        </View>
      </View>
      <Modal visible={visible} animationType="fade" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={{ margin: 8, fontSize: 16 }}>
              정말로 탈퇴하시겠습니까?
            </Text>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <View style={{ width: "40%", marginRight: 10 }}>
                <Button
                  title="예"
                  onPress={deleteAccountHandler}
                  color={"#f29999"}
                />
              </View>
              <View style={{ width: "40%" }}>
                <Button
                  title="아니오"
                  onPress={() => {
                    setVisible(false);
                  }}
                  color={"#99a2f2"}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  mainContainer: {
    flex: 3,
    width: "100%",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  profileContainer: {
    flex: 1,
    paddingTop: "10%",
    alignItems: "center",
    width: "100%",
  },
  profileButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
  nameInputContainer: {
    position: "relative",
    width: "85%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  nameInput: {
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
  nameModifyButton: {
    position: "absolute",
    backgroundColor: "#D9D9D9",
    height: 30,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    right: 10, // 우측에 정렬
    top: 20, // 상단에 정렬
  },
  nameModifyButtonText: {
    color: "black",
    fontSize: 12,
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
export default ProfileScreen;
