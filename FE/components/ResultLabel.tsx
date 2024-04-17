import { Pressable, StyleSheet, Text, View } from "react-native";

const ResultLabel = () => {
  const product = { cabbage: "양배추" };
  return (
    <View
      style={{
        marginLeft: "5%",
        marginRight: "5%",
      }}
    >
      <View style={styles.Label}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Text style={styles.text}>농산물 진단</Text>
          <Text style={styles.date}>2024.04.15</Text>
        </View>
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.buttonOuterContainer, styles.pressed]
              : styles.buttonOuterContainer
          }
          onPress={() => {}}
        >
          <View>
            <Text style={{ color: "#42AF4D", fontWeight: "bold" }}>
              진단 기록 보기
            </Text>
          </View>
        </Pressable>
      </View>
      <View
        style={{
          marginTop: "2%",
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <Text style={{ fontSize: 14 }}>진단 농산물: </Text>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {product.cabbage}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Label: {
    top: "5%",
    alignItems: "center",
    zIndex: 10,
    marginBottom: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "#42AF4D",
    fontSize: 20,
    fontWeight: "900",
  },
  date: {
    color: "#ACB7C3",
    fontSize: 14,
    marginLeft: 5,
  },
  pressed: {
    opacity: 0.75,
  },
  buttonOuterContainer: {
    borderRadius: 10,
    width: 100,
    height: 30,
    overflow: "hidden",
    padding: 5,
    backgroundColor: "#E8F9E5",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ResultLabel;
