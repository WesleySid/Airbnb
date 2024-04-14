import { TextInput, StyleSheet } from "react-native";

const CustomInput = ({ name, state, setState, password }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={name}
      value={state}
      onChangeText={(text) => {
        setState(text);
      }}
      secureTextEntry={password ? true : false}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    height: 35,
    // backgroundColor: "red",
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "pink",
    marginVertical: 10,
  },
});
