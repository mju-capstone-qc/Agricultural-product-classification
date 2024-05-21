import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { login } from "../types/type";
import { saveLogoutInfo } from "../utils/login";
import { useNavigation } from "@react-navigation/native";

type CustomDrawerContentProps = DrawerContentComponentProps & {
  setLogin: React.Dispatch<React.SetStateAction<login | null>>;
};

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = (props) => {
  const handleLogout = () => {
    // 로그아웃 로직을 여기에 구현
    props.setLogin(null); // 예시로 로그인 상태를 초기화
    saveLogoutInfo();
  };
  const navigator = useNavigation();

  return (
    <>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ flex: 1 }} // contentContainerStyle을 사용하여 전체 화면 차지
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-between", // 위쪽과 아래쪽에 공간 배분
          }}
        >
          <View>
            <DrawerItemList {...props} />
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          onPress={() => {
            console.log("내정보");
            navigator.navigate("Profile" as never);
          }}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutText}>내정보</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  logoutContainer: {
    paddingHorizontal: 20,
    paddingVertical: "5%",
    flexDirection: "row",
  },
  logoutButton: {
    paddingVertical: 10,
    borderRadius: 5,
    paddingHorizontal: "10%",
  },
  logoutText: {
    color: "black",
    fontWeight: "500",
    textAlign: "center",
    fontSize: 16,
  },
});

export default CustomDrawerContent;
