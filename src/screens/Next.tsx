import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Next">;
const Next: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Next</Text>
    </View>
  );
};

export default Next;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
});
