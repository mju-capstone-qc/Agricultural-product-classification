import { Image, Text, View, StyleSheet } from "react-native";
import { products } from "../types/type";

type Props = {
  value: products;
};

const InfoImage = ({ value }: Props) => {
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
    width: 135,
    height: 135,
  },
});

export default InfoImage;
