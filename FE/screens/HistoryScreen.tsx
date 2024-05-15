import { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { resultType } from "../types/type";
import { getHistory } from "../utils/history";
import { useFocusEffect } from "@react-navigation/native";
import HistoryItem from "../components/HistoryItem";
import FilterModal from "../components/FilterModal";
import { product } from "../utils/products";

type Props = {
  email: string;
};

const HistoryScreen = ({ email }: Props) => {
  const [history, setHistory] = useState<resultType[]>();
  const [filteredHistory, setFilteredHistory] = useState<resultType[]>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const applyFilter = (filter: string, search: string) => {
    setSelectedFilter(filter);
    setSearchTerm(search);
    toggleModal();

    if (history) {
      let sortedHistory = [...history];

      if (filter) {
        switch (filter) {
          case "높은 등급 순":
            sortedHistory.sort((a, b) => a.grade_id - b.grade_id);
            break;
          case "낮은 등급 순":
            sortedHistory.sort((a, b) => b.grade_id - a.grade_id);
            break;
          case "최신순":
            sortedHistory.sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
            break;
          case "오래된 순":
            sortedHistory.sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            );
            break;
        }
      }

      if (search) {
        sortedHistory = sortedHistory.filter((item) =>
          product[item.product_name]
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      }

      setFilteredHistory(sortedHistory);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchHistory = async () => {
        try {
          const fetchedHistory = await getHistory(email);
          setHistory(fetchedHistory);
          setFilteredHistory(fetchedHistory); // 초기값 설정
        } catch (error) {
          console.log(error);
        }
      };
      fetchHistory();
    }, [email])
  );

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonOuterContainer, styles.pressed]
            : styles.buttonOuterContainer
        }
        onPress={toggleModal}
      >
        <Text style={{ color: "#42AF4D", fontWeight: "bold", fontSize: 15 }}>
          필터
        </Text>
        <Image
          style={styles.logo}
          source={require("../assets/images/filter.png")}
        />
      </Pressable>
      <FilterModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        applyFilter={applyFilter}
      />
      <FlatList
        data={filteredHistory}
        renderItem={(item) => <HistoryItem item={item.item} />}
        keyExtractor={(item) => item.result_id + ""}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  buttonOuterContainer: {
    position: "absolute",
    backgroundColor: "#E8F9E5",
    borderRadius: 10,
    width: 70,
    height: 30,
    overflow: "hidden",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    top: 20,
    right: 10,
    zIndex: 10,
  },
  logo: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },
});

export default HistoryScreen;
