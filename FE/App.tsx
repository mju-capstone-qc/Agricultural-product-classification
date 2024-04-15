import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen";
import { Image, Text, View, StyleSheet } from "react-native";

const Drawer = createDrawerNavigator();

export default function App() {
  const login = { login: true };
  return (
    <>
      <NavigationContainer>
        {login.login ? (
          <Drawer.Navigator
            screenOptions={{
              headerTitleAlign: "center",
              drawerItemStyle: { backgroundColor: "white" },
              drawerActiveTintColor: "#27C077",
              headerTintColor: "black",
            }}
          >
            <Drawer.Screen
              name="NAITE"
              component={HomeScreen}
              options={{
                headerTitle: () => (
                  <View style={styles.title}>
                    <Text style={styles.titleText}>NAITE</Text>
                    <Image
                      style={styles.logo}
                      source={require("./assets/images/logo_no_title.png")}
                    />
                  </View>
                ),
                title: "진단하기",
              }}
            />
            {/* <Drawer.Screen name="Login" component={LoginScreen} /> */}
          </Drawer.Navigator>
        ) : (
          <LoginScreen />
        )}
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  logo: {
    width: 44,
    height: 44,
  },
  header: {
    margin: 0,
  },
});
