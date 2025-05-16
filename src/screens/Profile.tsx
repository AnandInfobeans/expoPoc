import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const Profile: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Profile!</Text>
      <Pressable onPress={() => navigation.goBack()} style={styles.btn}>
        <Text style={styles.btnTxt}>Back</Text>
      </Pressable>
    </View>
  );
};

export default Profile;

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
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "tomato",
    borderRadius: 20,
    marginTop: 10,
  },
  btnTxt: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
});
