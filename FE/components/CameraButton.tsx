import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

const CameraButton = () => {
  return (
    <View style={{ flex: 1 }}>
      <Pressable
        style={({ pressed }) =>
          pressed ? [styles.cameraImage, styles.pressed] : styles.cameraImage
        }
      >
        <Image
          style={{ width: 60, height: 60 }}
          source={require("../assets/images/camera.png")}
        ></Image>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraImage: {
    width: 60,
    height: 60,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default CameraButton;
