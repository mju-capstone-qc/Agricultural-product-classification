import { ScrollView, Text, View, StyleSheet } from "react-native";
import { products } from "../types/type";

type Props = {
  value: products;
};

const InfoText = ({ value }: Props) => {
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
