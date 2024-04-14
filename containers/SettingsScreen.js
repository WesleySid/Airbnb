// SettingsScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function SettingsScreen({ setToken }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await axios.get(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/me"
          );
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      setToken(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Hello Settings</Text>
      {user && (
        <View>
          <Text>Email: {user.email}</Text>
          <Text>Username: {user.username}</Text>
          <Text>Description: {user.description}</Text>
        </View>
      )}
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
}
