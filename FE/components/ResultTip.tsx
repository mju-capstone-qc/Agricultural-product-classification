import { ScrollView, StyleSheet, Text, View } from "react-native";

const ResultTip = () => {
  const title = { cabbage: "좋은 양배추 선별 TIP!" };
  const content = {
    cabbage:
      "과도하게 벌레가 먹지 않고, 겉표면이 무리지 않은 것을 찾아보세요!\n\n\
속에 추대가 올라오지 않은 것, 밑동 부분이 갈라지지 않은 것, 변색이 되지 않은 것이 건강한 양배추임을 보여준답니다!\n\n\
친환경 양배추는 성장촉진제 및 성장억제제를 사용하지 않아 계절마다 중량 및 크기가 일정하지 않습니다.",
  };
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
        <Text style={styles.tipTitle}>{title.cabbage}</Text>
        <Text style={styles.tipText}>{content.cabbage}</Text>
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
