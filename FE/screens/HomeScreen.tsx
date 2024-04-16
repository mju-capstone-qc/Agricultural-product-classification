import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Background from "../components/Background";
import CameraButton from "../components/CameraButton";
import InfoImage from "../components/InfoImage";
import InfoText from "../components/InfoText";

const HomeScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "양배추", value: "cabbage" },
    { label: "사과", value: "apple" },
    { label: "무", value: "radish" },
  ]);

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flex: 7,
          }}
        >
          <View style={styles.dropDown}>
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
        {!value ? <Background /> : <CameraButton />}
      </View>
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
    zIndex: 10,
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
  },
});

export default HomeScreen;
