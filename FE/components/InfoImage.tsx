import { Image, Text, View, StyleSheet } from "react-native";
import { products } from "../types/type";
import { product } from "../utils/products";

type Props = {
  value: products;
};

const InfoImage = ({ value }: Props) => {
  const images = {
    cabbage: require("../assets/images/cabbage.png"),
    apple: require("../assets/images/apple.png"),
    radish: require("../assets/images/radish.png"),
    // chinese_cabbage: require("../assets/images/chinese_cabbage.png"),
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={images[value]}
        style={styles.informationImage}
        resizeMode="contain"
      />
      <Text style={styles.informationLabel}>{product[value]}</Text>
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
