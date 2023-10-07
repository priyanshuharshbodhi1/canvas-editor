import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Animated,
  PanResponder,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function CreateProject({ route, navigation }) {
  // const { selectedProject } = route.params;

  // const [panResponderPositions, setPanResponderPositions] = useState(
  //   selectedProject ? selectedProject.positions : []
  // );
  const [projectNumber, setProjectNumber] = useState(1);

  const [textInputCoordinates, setTextInputCoordinates] = useState([]);

  const [userText, setUserText] = useState("");
  const [textInputs, setTextInputs] = useState([]);
  const textInputRefs = useRef([]);
  const panResponderRefs = useRef([]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleUndo = () => {};

  const handleRedo = () => {};

  const handleSave = async () => {
    try {
      const projectData = {
        textInputs,
        positions: panResponderPositions,
        coordinates: textInputCoordinates, // Save the coordinates
      };

      const projectKey = `project${projectNumber}`;
      await AsyncStorage.setItem(projectKey, JSON.stringify(projectData));

      // Increment the project number for the next project
      setProjectNumber(projectNumber + 1);

      // Store the updated project number in AsyncStorage
      await AsyncStorage.setItem('projectNumber', String(projectNumber));
    } catch (error) {
      console.error('Error saving project:', error);
    }
  }


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

  const handleRemoveTextInput = (index) => {
    const updatedInputs = [...textInputs];
    updatedInputs.splice(index, 1);
    setTextInputs(updatedInputs);
  };

  const createPanResponder = (index) => {
    const pan = new Animated.ValueXY();

    pan.addListener((value) => {
      // Update the coordinates in state
      const updatedCoordinates = [...textInputCoordinates];
      updatedCoordinates[index] = value;
      setTextInputCoordinates(updatedCoordinates);
    });

    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: (_, gestureState) => {
        panResponderRefs.current[index].setNativeProps({
          style: {
            transform: [
              { translateX: gestureState.dx },
              { translateY: gestureState.dy },
            ],
          },
        });
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    });
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

      <ScrollView style={styles.textContainer}>
        {textInputs.map((text, index) => (
          <Animated.View
            key={index}
            style={styles.textInputContainer}
            {...createPanResponder(index).panHandlers}
            ref={(ref) => (panResponderRefs.current[index] = ref)}
          >
            <TextInput
              ref={(ref) => (textInputRefs.current[index] = ref)}
              style={styles.textInput}
              value={text}
              onChangeText={(text) => handleTextInputChange(text, index)}
              placeholder="Type here..."
              multiline={true}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => handleRemoveTextInput(index)}
            >
              <Icon name="close" size={20} color="red" />
            </TouchableOpacity>
          </Animated.View>
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
  textContainer: {
    // flex: 1,
  },
  textInputContainer: {
    alignItems: "center",
    marginTop: 35,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    position: "relative",
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: "blue",
    fontSize: 18,
    paddingHorizontal: 10,
  },
  closeButton: {
    // position: "absolute",
    // borderRadius: 50,
    top: 0,
    right: 0,
    backgroundColor: "blue",
    padding: 0,
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
