import { ImageBackground, StyleSheet } from "react-native";

const Background = () => {
  return (
    <ImageBackground
      style={styles.image}
      source={require("../assets/images/logo_no_title.png")}
    ></ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    position: "absolute", // 절대적 위치 지정
    top: "50%", // 화면 세로 중앙에 위치
    left: "50%", // 화면 가로 중앙에 위치
    width: 208,
    height: 208,
    marginLeft: -104, // 이미지의 절반 크기만큼 왼쪽으로 이동
    marginTop: -104, // 이미지의 절반 크기만큼 위쪽으로 이동
    opacity: 0.4,
    zIndex: -1,
  },
});

export default Background;
