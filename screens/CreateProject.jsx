import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function CreateProject({ navigation }) {
  const handleBack = () => {
    navigation.goBack();
  };

  
  const handleUndo = () => {
    
  };

  
  const handleRedo = () => {
    
  };

  
  const handleSave = () => {
    
  };

  const handleText = () => {
    
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

      <View style={styles.space} />

      <TouchableOpacity style={styles.bottomBar} onPress={handleText}>
        <Text style={styles.bottomButton}>TEXT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
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
  space: {
    flex: 1,
  },
  bottomBar: {
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  bottomButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
