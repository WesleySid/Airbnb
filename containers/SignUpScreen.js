// SignUpScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import axios from "axios";
import CustomInput from "../components/CustomInput";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [desc, setDesc] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setErrorMessage("");
    if (email && username && desc && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
            { email, username, description: desc, password }
          );
          const token = response.data.token;
          // Store token in AsyncStorage
          // Redirect to Home screen
          navigation.navigate("Home");
        } catch (error) {
          setErrorMessage(error.response.data.error);
        }
      } else {
        setErrorMessage("Passwords do not match");
      }
    } else {
      setErrorMessage("Please fill in all fields");
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={require("../assets/images/logo.jpg")}
        style={styles.logoPic}
      />
      <Text style={styles.title}>Sign up</Text>
      <CustomInput name="email" state={email} setState={setEmail} />
      <CustomInput name="username" state={username} setState={setUsername} />
      <TextInput
        placeholder="Describe yourself in a few words ..."
        style={styles.bigInput}
        value={desc}
        onChangeText={setDesc}
        multiline
      />
      <CustomInput
        name="password"
        state={password}
        setState={setPassword}
        password
      />
      <CustomInput
        name="confirm password"
        state={confirmPassword}
        setState={setConfirmPassword}
        password
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={{ fontSize: 20 }}>Sign up</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("SignIn")}>
        <Text>Already have an account? Sign in</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  logoPic: { height: 112, width: 120 },
  title: { fontSize: 30, color: "grey", fontWeight: "600" },
  bigInput: {
    height: 100,
    padding: 10,
    width: 200,
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
