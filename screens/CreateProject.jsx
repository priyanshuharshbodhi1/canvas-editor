import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function CreateProject({ navigation }) {
  const [userText, setUserText] = useState("");
  const [textInputs, setTextInputs] = useState([]);
  const textInputRefs = useRef([]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleUndo = () => {};

  const handleRedo = () => {};

  const handleSave = () => {};

  const handleText = () => {
    setTextInputs([...textInputs, ""]);
  };

  const handleTextInputClick = (index) => {
    textInputRefs.current[index].focus();
  };

  const handleTextInputChange = (text, index) => {
    const updatedInputs = [...textInputs];
    updatedInputs[index] = text;
    setTextInputs(updatedInputs);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.button}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleUndo}>
          <Icon name="undo" size={35} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRedo}>
          <Icon name="redo" size={35} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.button}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {textInputs.map((text, index) => (
          <TouchableOpacity
            key={index}
            style={styles.textInputContainer}
            onPress={() => handleTextInputClick(index)}
          >
            <TextInput
              ref={(ref) => (textInputRefs.current[index] = ref)}
              style={styles.textInput}
              value={text}
              onChangeText={(text) => handleTextInputChange(text, index)}
              placeholder="Type here..."
              multiline={true}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.bottomBar} onPress={handleText}>
        <Text style={styles.bottomButton}>TEXT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    fontSize: 18,
    fontWeight: "bold",
    color: "grey",
    marginLeft: 10,
  },
  textInputContainer: {
    alignItems: "center",
    marginTop: 35,
    marginLeft: 10,
    marginRight: 10,
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: "blue",
    fontSize: 18,
    paddingHorizontal: 10,
  },
  bottomBar: {
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  bottomButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
