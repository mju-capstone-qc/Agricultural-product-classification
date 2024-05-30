import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import RegularButton from "../components/RegularButton";
import ResultLabel from "../components/ResultLabel";
import ResultProduct from "../components/ResultProduct";
import ResultTip from "../components/ResultTip";
import { RouteProp } from "@react-navigation/native";
import { products, result } from "../types/type";
import { getKoreanDate, product_idx } from "../utils/util";
import { saveResult } from "../utils/save";
import StandardModal from "../components/StandardModal";
import { useState } from "react";

type RootStackParamList = {
  Result: { result: result[]; label: products; email: string };
};

type ResultScreenRouteProp = RouteProp<RootStackParamList, "Result">;

type Props = {
  route?: ResultScreenRouteProp;
};

const ResultScreen = ({ route }: Props) => {
  const [visible, setVisible] = useState(false);

  const setHidden = () => {
    setVisible(false);
  };

  let predicted_class = 0 as 0 | 1 | 2;
  let url = "";
  const label = route!.params.label;
  const email = route!.params.email;

  if (route && route.params.result) {
    const result = route.params.result;
    let predict = 0;
    for (let i = 0; i < result.length; i += 1) {
      if (predict < result[i].predicted_class)
        predict = result[i].predicted_class;
    }
    console.log(result);
    url = result[0].url;
    predicted_class = predict as 0 | 1 | 2;
    const date = getKoreanDate();
    console.log(date);
    saveResult(url, email, product_idx[label], predicted_class, date);
  }
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
                <RegularButton
                  onPress={() => {
                    setVisible(true);
                  }}
                  color="#42AF4D"
                >
                  등급선별기준 확인하기
                </RegularButton>
              </View>
            </View>
          </View>
        </View>
        <StandardModal visible={visible} setHidden={setHidden} label={label} />
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
