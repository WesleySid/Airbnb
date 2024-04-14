// SignInScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    async function savePasswordToAsyncStorage() {
      if (password) {
        await AsyncStorage.setItem("password", password);
      }
    }
    savePasswordToAsyncStorage();
  }, [password]);

  const handleSignIn = () => {
    const userToken = "secret-token"; // You may use actual authentication logic here
    setToken(userToken);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.main}>
        <Image
          source={require("../assets/images/logo.jpg")}
          style={styles.logoPic}
        />
        <Text style={styles.title}>Sign in</Text>
      </View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Pressable style={styles.button} onPress={handleSignIn}>
        <Text>Sign in</Text>
      </Pressable>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: { alignItems: "center" },
  logoPic: { height: 112, width: 120 },
  title: { fontSize: 30, color: "grey", fontWeight: "600" },
  input: {
    width: 200,
    padding: 10,
    borderColor: "pink",
    borderWidth: 2,
    marginVertical: 10,
  },
  button: {
    borderColor: "red",
    borderWidth: 3,
    width: 200,
    height: 65,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});
