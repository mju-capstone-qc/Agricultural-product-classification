import { ScrollView, Text, View, StyleSheet } from "react-native";
import { products } from "../types/type";
import { getInfo } from "../utils/information";
import { useEffect, useState } from "react";

type Props = {
  value: products;
};

const InfoText = ({ value }: Props) => {
  const [info, setInfo] = useState<string>();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const fetchedInfo = await getInfo(value);
        setInfo(fetchedInfo);
      } catch (error) {
        console.log("Error getting info: ", error);
      }
    };

    fetchInfo();
  }, [value]);

  return (
    <View
      style={{
        flex: 1,
        margin: "5%",
        backgroundColor: "#F4FBF2",
      }}
    >
      <ScrollView>
        <Text style={styles.informationText}>{info}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  informationText: {
    fontSize: 16,
    padding: 20,
    color: "#ACB7C3",
  },
});
export default InfoText;
