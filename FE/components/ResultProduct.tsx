import { Image, StyleSheet, Text, View } from "react-native";

type Props = {
  predicted_class: 0 | 1 | 2;
  url: string;
};

const ResultProduct = ({ predicted_class, url }: Props) => {
  const grade = { 0: "특", 1: "상", 2: "보통" };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        style={styles.informationImage}
        source={{ uri: url }}
        resizeMode="contain"
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={styles.informationLabel}>진단결과: </Text>
        <Text style={{ ...styles.informationLabel, ...styles.gradeText }}>
          {grade[predicted_class]}
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
    width: 135,
    height: 135,
  },
  gradeText: {
    color: "#42AF4D",
    fontWeight: "bold",
  },
});

export default ResultProduct;
