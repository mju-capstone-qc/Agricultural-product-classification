import { Image, Text, View, StyleSheet } from "react-native";
import { resultType } from "../types/type";
import { formatDate } from "../utils/util";
import { product } from "../utils/products";

type Props = {
  item: resultType;
};

const HistoryItem = ({ item }: Props) => {
  const grade = { 0: "특", 1: "상", 2: "보통" };

  return (
    <View style={{ margin: 20, alignItems: "center" }}>
      <View style={{ alignSelf: "baseline" }}>
        <Text style={styles.date}>{formatDate(item.date)}</Text>
        <View
          style={{
            marginTop: "2%",
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Text style={{ fontSize: 14 }}>진단 농산물: </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {product[item.product_name]}
          </Text>
        </View>
      </View>
      <View>
        <Image
          style={styles.informationImage}
          source={{ uri: item.image_path }}
          resizeMode="contain"
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.informationLabel}>진단결과: </Text>
        <Text style={{ ...styles.informationLabel, ...styles.gradeText }}>
          {grade[item.grade_id]}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  informationLabel: {
    color: "#ACB7C3",
    fontSize: 20,
    fontWeight: "400",
  },
  informationImage: {
    width: 150,
    height: 150,
    margin: 20,
  },
  gradeText: {
    color: "#42AF4D",
    fontWeight: "bold",
  },
  date: {
    color: "#ACB7C3",
    fontSize: 14,
  },
});

export default HistoryItem;
