import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Home from "../screens/Home";
import Profile from "../screens/Profile";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default RootStack;
