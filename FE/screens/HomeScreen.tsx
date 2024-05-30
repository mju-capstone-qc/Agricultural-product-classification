import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Background from "../components/Background";
import CameraButton from "../components/CameraButton";
import InfoImage from "../components/InfoImage";
import InfoText from "../components/InfoText";
import { login } from "../types/type";
import { product_label } from "../utils/products";
import GuideModal from "../components/GuideModal";

type Props = {
  login: login;
};

const HomeScreen = ({ login }: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(product_label);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const loadingHandler = (bool: boolean) => {
    setLoading(bool);
  };

  console.log("현재 로그인: ", login.email);

  return (
    <>
      <View style={styles.container}>
        <View style={{ flex: 7 }}>
          <View style={styles.dropDown}>
            <View style={{ top: "20%" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <Text style={styles.text}>농산물 선택하기</Text>
                <Pressable
                  style={({ pressed }) =>
                    pressed
                      ? [styles.buttonOuterContainer, styles.pressed]
                      : styles.buttonOuterContainer
                  }
                  onPress={() => {
                    setVisible(true);
                  }}
                >
                  <View>
                    <Text style={{ color: "#42AF4D", fontWeight: "bold" }}>
                      촬영 Tip!
                    </Text>
                  </View>
                </Pressable>
                <GuideModal
                  visible={visible}
                  setHidden={() => {
                    setVisible(false);
                  }}
                />
              </View>
              <DropDownPicker
                searchable={true}
                searchPlaceholder="Search..."
                placeholder="농산물 선택"
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                searchContainerStyle={styles.search}
                style={{ borderWidth: 1, borderColor: "#D9D9D9" }}
                dropDownContainerStyle={{
                  borderWidth: 1,
                  borderColor: "#D9D9D9",
                }}
                searchTextInputStyle={{ borderWidth: 0 }}
              />
            </View>
          </View>
          {value ? (
            <View style={styles.information}>
              <InfoImage value={value} />
              <InfoText value={value} />
            </View>
          ) : null}
        </View>
        {!value ? (
          <Background />
        ) : (
          <CameraButton
            email={login.email}
            label={value}
            loadingHandler={loadingHandler}
          />
        )}
      </View>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#42AF4D" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  dropDown: {
    alignItems: "center",
    marginLeft: "10%",
    marginRight: "10%",
    marginBottom: "5%",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
  },
  search: {
    borderWidth: 0,
    borderBottomColor: "#D9D9D9",
  },
  information: {
    alignItems: "center",
    flex: 1,
    zIndex: -1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust transparency
    zIndex: 9999, // Ensure it's on top
  },
  buttonOuterContainer: {
    borderRadius: 10,
    width: 80,
    height: 30,
    overflow: "hidden",
    padding: 5,
    backgroundColor: "#E8F9E5",
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});

export default HomeScreen;
