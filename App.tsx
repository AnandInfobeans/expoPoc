import { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as Updates from "expo-updates";

import RootStack from "./src/navigation/RootStack";

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
    <NavigationContainer>
      <StatusBar style="auto" />
      <RootStack />
    </NavigationContainer>
  );
}
