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

const HomeScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "양배추", value: "cabbage" },
    { label: "사과", value: "apple" },
    { label: "무", value: "radish" },
  ]);

  const images = {
    cabbage: require("../assets/images/cabbage.png"),
    apple: require("../assets/images/apple.png"),
    radish: require("../assets/images/radish.png"),
  };

  const names = {
    cabbage: "양배추",
    apple: "사과",
    radish: "무",
  };

  const info = {
    cabbage:
      "양배추의 효능: 미국 타임지 선정 세계 3대 건강식품이다. 변비에 좋고 식이섬유가 풍부하다.\
양배추 잎을 넣고 끓인 물은 건강에 좋다. 변비에 효과를 보려면 단지 끓인 물뿐 아니라 이파리도 같이 먹자. 다이어트와 피부미용에도 좋다고 한다.\n\n\
양배추는 위염, 위궤양에 특효한 것으로 유명하며, 양배추의 설포라판 등의 성분은 위염 및 위암의 원인인 헬리코박터균을 박멸하고 위 점막의 손상을 보호해주기 때문에 히포크라테스도 위가 안좋은 사람들에게 처방해주기도 하였다.",
    apple:
      "여기에는 사과의 효능이 들어올거다여기에는 사과의 효능이 들어올거다여기에는 사과의 효능이 들어올거다",
    radish:
      "여기에는 무의 효능이 들어올거다여기에는 무의 효능이 들어올거다여기에는 무의 효능이 들어올거다",
  };
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flex: 7,
          }}
        >
          <View style={styles.dropDown}>
            <View style={{ top: "10%" }}>
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
              <View style={{ alignItems: "center" }}>
                <Image
                  source={images[value]}
                  style={styles.informationImage}
                  resizeMode="contain"
                />
                <Text style={styles.informationLabel}>{names[value]}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  margin: "5%",
                  backgroundColor: "#F4FBF2",
                }}
              >
                <ScrollView>
                  <Text style={styles.informationText}>{info[value]}</Text>
                </ScrollView>
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>
        {!value ? (
          <ImageBackground
            style={styles.image}
            source={require("../assets/images/logo_no_title.png")}
          ></ImageBackground>
        ) : (
          <View style={{ flex: 1 }}>
            <Pressable
              style={({ pressed }) =>
                pressed
                  ? [styles.cameraImage, styles.pressed]
                  : styles.cameraImage
              }
            >
              <Image
                style={{ width: 60, height: 60 }}
                source={require("../assets/images/camera.png")}
              ></Image>
            </Pressable>
          </View>
        )}
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
  cameraImage: {
    width: 60,
    height: 60,
  },
  pressed: {
    opacity: 0.75,
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
  informationLabel: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  informationText: {
    fontSize: 16,
    padding: 20,
    color: "#ACB7C3",
  },
  informationImage: {
    width: 135,
    height: 135,
  },
});

export default HomeScreen;
