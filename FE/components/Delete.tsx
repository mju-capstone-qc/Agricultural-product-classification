import axios from "axios";
import { ReactNode } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { saveLogoutInfo } from "../utils/login";

const Delete = () => {
  return (
    <Pressable
      android_ripple={{ color: "blue" }}
      style={({ pressed }) =>
        pressed
          ? [styles.buttonOuterContainer, styles.pressed]
          : styles.buttonOuterContainer
      }
      onPress={async () => {
        saveLogoutInfo();
        await axios.post(
          "https://kapi.kakao.com/v1/user/unlink",
          {
            target_id_type: "user_id",
            target_id: 3443374177, //  해당 사용자 id(카카오 회원번호)
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: "KakaoAK " + "7f909b620ac7efd2929878dbc8370432",
            },
          }
        );
      }}
    >
      <View style={[styles.buttonInnerContainer, { backgroundColor: "blue" }]}>
        <Text style={styles.buttonText}>회원삭제</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonOuterContainer: {
    height: 44,
    width: "85%",
    borderRadius: 8,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
});
export default Delete;
