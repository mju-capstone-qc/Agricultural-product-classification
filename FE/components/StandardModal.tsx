import React from "react";
import {
  Pressable,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { products } from "../types/type";

type Props = {
  visible: boolean;
  setHidden: () => void;
  label: products;
};

const StandardModal = ({ visible, setHidden, label }: Props) => {
  const images = {
    cabbage: require("../assets/images/cabbage_standard.jpg"),
    apple: require("../assets/images/apple_standard.jpg"),
    radish: require("../assets/images/radish_standard.jpg"),
    // chinese_cabbage: require("../assets/images/chinese_cabbage_standard.jpg"),
  };
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Image
              style={styles.modalImage}
              source={images[label]}
              resizeMode="contain"
            />
          </ScrollView>
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
    height: "40%",
    width: "90%", // 원하는 너비 설정
    backgroundColor: "white",
    position: "relative", // 부모 컨테이너를 기준으로 위치 설정
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1, // 비율을 유지하면서 이미지 크기 조정
  },
  closeButton: {
    position: "absolute", // 절대 위치 설정
    top: 10, // 모달 상단부터의 거리
    right: 5, // 모달 오른쪽부터의 거리
    width: 24,
    height: 24,
  },
});

export default StandardModal;
