import { ScrollView, StyleSheet, Text, View } from "react-native";
import { products } from "../types/type";
import { useEffect, useState } from "react";
import { getTip } from "../utils/information";
import { product } from "../utils/products";
type Props = {
  label: products;
};
const ResultTip = ({ label }: Props) => {
  const [tip, setTip] = useState<string>();

  useEffect(() => {
    const fetchedTip = async () => {
      try {
        const fetchedTip = await getTip(label);
        setTip(fetchedTip);
      } catch (error) {
        console.log("Error getting info: ", error);
      }
    };

    fetchedTip();
  }, [label]);
  return (
    <View
      style={{
        flex: 1,
        margin: "5%",
        marginBottom: "2%",
        backgroundColor: "#F4FBF2",
      }}
    >
      <ScrollView>
        <Text style={styles.tipTitle}>좋은 {product[label]} 선별 TIP!</Text>
        <Text style={styles.tipText}>{tip}</Text>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  tipTitle: {
    padding: 20,
    paddingBottom: 0,
    color: "#42AF4D",
    fontSize: 20,
    fontWeight: "bold",
  },
  tipText: {
    fontSize: 18,
    padding: 20,
    color: "#42AF4D",
  },
});
export default ResultTip;
