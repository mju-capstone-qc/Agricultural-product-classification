import React from "react";
import { Pressable, Image, Modal, StyleSheet, View, Text } from "react-native";
import { products } from "../types/type";

type Props = {
  visible: boolean;
  setHidden: () => void;
};

const GuideModal = ({ visible, setHidden }: Props) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.modalImage}
              source={require("../assets/images/guide.png")}
              resizeMode="contain"
            />
          </View>
          <Pressable style={styles.closeButton} onPress={setHidden}>
            <View>
              <Text style={{ fontWeight: "400", fontSize: 24 }}>X</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명 배경
  },
  modalContainer: {
    height: "80%", // 모달 전체 높이의 80%로 설정
    width: "90%", // 원하는 너비 설정
    backgroundColor: "white",
    position: "relative", // 부모 컨테이너를 기준으로 위치 설정
    borderRadius: 10,
  },
  imageContainer: {
    flex: 1, // 이미지가 컨테이너를 채우도록 함
  },
  modalImage: {
    flex: 1, // 이미지가 컨테이너를 채우도록 함
    width: undefined, // 가로 크기는 부모 컨테이너에 맞춤
    height: undefined, // 세로 크기는 부모 컨테이너에 맞춤
  },
  closeButton: {
    position: "absolute", // 절대 위치 설정
    top: 10, // 모달 상단부터의 거리
    right: 5, // 모달 오른쪽부터의 거리
    width: 24,
    height: 24,
  },
});

export default GuideModal;
