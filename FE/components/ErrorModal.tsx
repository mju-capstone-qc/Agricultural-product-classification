import { Button, Modal, StyleSheet, Text, View } from "react-native";

type Props = {
  visible: boolean;
  setHidden: () => void;
  text: string;
};

const ErrorModal = ({ visible, setHidden, text }: Props) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={{ margin: 8 }}>{text}</Text>
          <View style={{ width: "100%" }}>
            <Button title="확인" onPress={setHidden} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명 배경
  },
  modalContainer: {
    justifyContent: "space-around",
    height: "20%",
    width: "70%", // 원하는 너비 설정
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
});

export default ErrorModal;
