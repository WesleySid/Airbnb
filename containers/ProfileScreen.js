// ProfileScreen.js
import React from "react";
import { Text, View } from "react-native";
import { useRoute } from "@react-navigation/core";

export default function ProfileScreen() {
  const { params } = useRoute();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>User ID: {params.userId}</Text>
    </View>
  );
}
