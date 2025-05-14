import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import * as Updates from "expo-updates";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    if (!__DEV__) {
      onFetchUpdateAsync();
    }
  }, []);

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        onUpdate();
      }
    } catch (error) {
      console.log(`Error fetching latest Expo update: ${error}`);
    }
  }
  const onUpdate = async () => {
    await Updates.fetchUpdateAsync();
    await Updates.reloadAsync();
  };
  return (
    <View style={styles.container}>
      <Text
        style={styles.txt}
      >{`Hii , This update from EXPO (OTA) branch build`}</Text>
      {/* <Image source={require("./assets/reactlogo.png")} style={styles.img} /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    height: 100,
    width: 100,
    backgroundColor: "grey",
    borderRadius: 10,
    marginTop: 15,
  },
  txt: {
    fontSize: 16,
    fontWeight: "700",
    color: "dodgerblue",
  },
});
