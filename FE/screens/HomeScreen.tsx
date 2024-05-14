import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Background from "../components/Background";
import CameraButton from "../components/CameraButton";
import InfoImage from "../components/InfoImage";
import InfoText from "../components/InfoText";
import Delete from "../components/Delete";
import { login } from "../types/type";

type Props = {
  login: login;
};

const HomeScreen = ({ login }: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "양배추", value: "cabbage" },
    { label: "부사사과", value: "fuji_apple" },
    { label: "양왕사과", value: "yanggwang_apple" },
    { label: "무", value: "radish" },
  ]);
  const [loading, setLoading] = useState(false);

  const loadingHandler = (bool: boolean) => {
    setLoading(bool);
  };

  console.log("현재 로그인: ", login.email);

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flex: 7,
          }}
        >
          <View style={styles.dropDown}>
            {/* <Delete></Delete> */}
            <View style={{ top: "20%" }}>
              <Text style={styles.text}>농산물 선택하기</Text>
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
          ) : (
            <></>
          )}
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
    marginBottom: 10,
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
    backgroundColor: "rgba(255, 255, 255, 0.5)", // 투명도 조절
    zIndex: 9999, // z-index 설정
  },
});

export default HomeScreen;
