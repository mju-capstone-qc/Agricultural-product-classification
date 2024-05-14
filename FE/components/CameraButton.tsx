import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions,
} from "expo-image-picker";
import axios, { AxiosResponse } from "axios";
import { URI } from "@env";
import { useNavigation } from "@react-navigation/native";
import { result } from "../types/type";

type Props = {
  label: string;
  loadingHandler: (bool: boolean) => void;
  email: string;
};

const CameraButton = ({ label, email, loadingHandler }: Props) => {
  console.log(URI);
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const navigation = useNavigation();

  async function verifyPermissions() {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app"
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    loadingHandler(true);

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!image.canceled) {
      try {
        const result = await axios
          .post(`${URI}/image`, {
            file: image.assets[0].base64,
            label: label,
            email: email,
          })
          .then((res: AxiosResponse<result>) => res.data);
        console.log(result);
        //@ts-ignore
        await navigation.navigate("Result", {
          result: result,
          label: label,
        });
      } catch (error) {
        console.error("error uploading image: ", error);
      } finally {
        loadingHandler(false);
      }
    } else {
      loadingHandler(false);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Pressable
        style={({ pressed }) =>
          pressed ? [styles.cameraImage, styles.pressed] : styles.cameraImage
        }
        onPress={takeImageHandler}
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
