import { ReactNode } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

type Props = {
  children: ReactNode;
  color: string;
  onPress: () => void;
};

const RegularButton = ({ children, color, onPress }: Props) => {
  return (
    <Pressable
      android_ripple={{ color: color }}
      style={({ pressed }) =>
        pressed
          ? [styles.buttonOuterContainer, styles.pressed]
          : styles.buttonOuterContainer
      }
      onPress={onPress}
    >
      <View style={[styles.buttonInnerContainer, { backgroundColor: color }]}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonOuterContainer: {
    height: 44,
    width: "85%",
    borderRadius: 8,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
});
export default RegularButton;
