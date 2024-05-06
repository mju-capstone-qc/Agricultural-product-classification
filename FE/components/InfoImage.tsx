import { Image, Text, View, StyleSheet } from "react-native";
import { products } from "../types/type";

type Props = {
  value: products;
};

const InfoImage = ({ value }: Props) => {
  const images = {
    cabbage: require("../assets/images/cabbage.png"),
    fuji_apple: require("../assets/images/apple.png"),
    yanggwang_apple: require("../assets/images/apple.png"),
    radish: require("../assets/images/radish.png"),
  };

  const names = {
    cabbage: "양배추",
    fuji_apple: "부사사과",
    yanggwang_apple: "양왕사과",
    radish: "무",
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={images[value]}
        style={styles.informationImage}
        resizeMode="contain"
      />
      <Text style={styles.informationLabel}>{names[value]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  informationLabel: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  informationImage: {
    width: 130,
    height: 130,
  },
});

export default InfoImage;
