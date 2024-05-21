import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import axios, { AxiosResponse } from "axios";
import { URI } from "@env";
import { useNavigation } from "@react-navigation/native";
import { result } from "../types/type";

interface Props {
  label: string;
  loadingHandler: (bool: boolean) => void;
  email: string;
}

interface SelectedImage {
  uri: string;
  base64: string;
}

const CameraButton: React.FC<Props> = ({ label, email, loadingHandler }) => {
  const navigation = useNavigation();
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const screenHeight = Dimensions.get("window").height;

  async function verifyPermissions(): Promise<boolean> {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app"
      );
      return false;
    }
    return true;
  }

  async function takeImagesWithCamera() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    loadingHandler(true);

    try {
      const imageResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });

      if (!imageResult.canceled && imageResult.assets) {
        setSelectedImages((prevImages) => [
          ...prevImages,
          ...imageResult.assets.map((asset) => ({
            uri: asset.uri,
            base64: asset.base64 || "",
          })),
        ]);
      }
      setModalVisible(true);
    } catch (error) {
      console.log("Error taking images: ", error);
    } finally {
      loadingHandler(false);
    }
  }

  async function selectImagesFromGallery() {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant media library permissions to use this app"
      );
      return;
    }

    loadingHandler(true);

    try {
      const imageResult = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
      });

      if (!imageResult.canceled && imageResult.assets) {
        setSelectedImages((prevImages) => [
          ...prevImages,
          ...imageResult.assets.map((asset) => ({
            uri: asset.uri,
            base64: asset.base64 || "",
          })),
        ]);
      }
      setModalVisible(true);
    } catch (error) {
      console.log("Error selecting images: ", error);
    } finally {
      loadingHandler(false);
    }
  }

  async function uploadImages() {
    loadingHandler(true);
    try {
      const results = await Promise.all(
        selectedImages.map((image) =>
          axios
            .post(`${URI}/image`, {
              file: image.base64,
              label: label,
              email: email,
            })
            .then((res: AxiosResponse<result>) => res.data)
        )
      );
      console.log(results);
      //@ts-ignore
      await navigation.navigate("Result", {
        result: results,
        label: label,
      });
    } catch (error) {
      console.error("Error uploading images: ", error);
    } finally {
      loadingHandler(false);
    }
  }

  function showImagePickerOptions() {
    Alert.alert("Select Image", "Choose an image source", [
      { text: "Camera", onPress: takeImagesWithCamera },
      { text: "Gallery", onPress: selectImagesFromGallery },
      { text: "Cancel", style: "cancel" },
    ]);
  }

  function removeImage(uri: string) {
    setSelectedImages((prevImages) =>
      prevImages.filter((image) => image.uri !== uri)
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Pressable
        style={({ pressed }) =>
          pressed ? [styles.cameraImage, styles.pressed] : styles.cameraImage
        }
        onPress={showImagePickerOptions}
      >
        <Image
          style={{ width: 60, height: 60 }}
          source={require("../assets/images/camera.png")}
        />
      </Pressable>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { height: 250 }]}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <ScrollView
              horizontal
              style={{ flex: 1 }}
              contentContainerStyle={styles.scrollViewContent}
            >
              {selectedImages.map((image, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image
                    source={{ uri: image.uri }}
                    style={styles.imagePreview}
                  />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removeImage(image.uri)}
                  >
                    <Text style={styles.deleteButtonText}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                style={[styles.imageContainer, styles.addButtonContainer]}
                onPress={showImagePickerOptions}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </ScrollView>
            <View style={styles.uploadButtonContainer}>
              <Pressable onPress={uploadImages} style={styles.uploadButton}>
                <Text style={styles.uploadButtonText}>Upload Images</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  imageContainer: {
    position: "relative",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
  },
  imagePreview: {
    width: 100,
    height: 100,
  },
  deleteButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "red",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 18,
  },
  addButtonContainer: {
    borderWidth: 2,
    borderColor: "#d3d3d3",
    borderRadius: 10,
  },
  addButtonText: {
    fontSize: 40,
    color: "#d3d3d3",
  },
  uploadButton: {
    backgroundColor: "#42AF4D",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  uploadButtonText: {
    color: "white",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  scrollViewContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
  },
  uploadButtonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});

export default CameraButton;
