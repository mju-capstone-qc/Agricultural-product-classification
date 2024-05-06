import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import RegularButton from "../components/RegularButton";
import ResultLabel from "../components/ResultLabel";
import ResultProduct from "../components/ResultProduct";
import ResultTip from "../components/ResultTip";
import { RouteProp } from "@react-navigation/native";
import { products, result } from "../types/type";

type RootStackParamList = {
  Result: { result: result; label: products };
};

type ResultScreenRouteProp = RouteProp<RootStackParamList, "Result">;

type Props = {
  route?: ResultScreenRouteProp;
};

const ResultScreen = ({ route }: Props) => {
  const { predicted_class, url } = route!.params.result;
  const label = route!.params.label;
  console.log(label);
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flex: 7,
            width: "100%",
          }}
        >
          <ResultLabel label={label} />
          <View style={{ flex: 1 }}>
            <ResultProduct predicted_class={predicted_class} url={url} />
            <View style={{ flex: 3 }}>
              <ResultTip label={label} />
              <View style={styles.button}>
                <RegularButton onPress={() => {}} color="#42AF4D">
                  등급선별기준 확인하기
                </RegularButton>
              </View>
            </View>
          </View>
        </View>
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
  search: {
    borderWidth: 0,
    borderBottomColor: "#D9D9D9",
  },
  information: {
    alignItems: "center",
    flex: 1,
  },
  informationLabel: {
    color: "#ACB7C3",
    fontSize: 20,
    fontWeight: "400",
  },
  informationImage: {
    width: 135,
    height: 135,
  },
  gradeText: {
    color: "#42AF4D",
    fontWeight: "bold",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%",
  },
});
export default ResultScreen;
