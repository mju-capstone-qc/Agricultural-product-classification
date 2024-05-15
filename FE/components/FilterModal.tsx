import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import Checkbox from "expo-checkbox";

type Props = {
  isModalVisible: boolean;
  toggleModal: () => void;
  applyFilter: (filter: string, search: string) => void;
};

const FilterModal = ({ isModalVisible, toggleModal, applyFilter }: Props) => {
  const [selectedSort, setSelectedSort] = useState<string>("최신순");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleApplyFilter = () => {
    applyFilter(selectedSort, searchTerm);
  };

  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="none"
      onRequestClose={toggleModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>필터</Text>
          <Text style={styles.sectionTitle}>정렬</Text>

          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setSelectedSort("최신순")}
          >
            <Text style={styles.modalButtonText}>최신순</Text>
            <Checkbox value={selectedSort === "최신순"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setSelectedSort("오래된 순")}
          >
            <Text style={styles.modalButtonText}>오래된 순</Text>
            <Checkbox value={selectedSort === "오래된 순"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setSelectedSort("높은 등급 순")}
          >
            <Text style={styles.modalButtonText}>높은 등급 순</Text>
            <Checkbox value={selectedSort === "높은 등급 순"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setSelectedSort("낮은 등급 순")}
          >
            <Text style={styles.modalButtonText}>낮은 등급 순</Text>
            <Checkbox value={selectedSort === "낮은 등급 순"} />
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>검색</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="진단 농산물명으로 검색"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => {
                setSelectedSort("최신순");
                setSearchTerm("");
              }}
            >
              <Text style={styles.resetButtonText}>선택 초기화</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApplyFilter}
            >
              <Text style={styles.applyButtonText}>적용하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  modalButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#E8F9E5",
    marginVertical: 5,
  },
  modalButtonText: {
    color: "#333",
  },
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginVertical: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  resetButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  applyButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#42AF4D",
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  resetButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  applyButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default FilterModal;
