import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CreateProject from "./screens/CreateProject.jsx";
import MyProject from "./screens/MyProject.jsx";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Create a New Project" component={CreateProject} />
        <Stack.Screen name="My Projects" component={MyProject} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Create New"
        onPress={() => navigation.navigate('Create a New Project')}
      />
      <Button
        title="My Projects"
        onPress={() => navigation.navigate('My Projects')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
});
