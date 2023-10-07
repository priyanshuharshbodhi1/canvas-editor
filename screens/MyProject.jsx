import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function MyProject({ navigation }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Load saved projects from AsyncStorage when the component mounts
    const loadProjects = async () => {
      try {
        const projectNumber = parseInt(await AsyncStorage.getItem('projectNumber'));
        const loadedProjects = [];

        for (let i = 1; i <= projectNumber; i++) {
          const projectKey = `project${i}`;
          const projectData = JSON.parse(await AsyncStorage.getItem(projectKey));

          if (projectData) {
            loadedProjects.push({
              key: projectKey,
              textInputs: projectData.textInputs,
              positions: projectData.positions,
            });
          }
        }

        setProjects(loadedProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    };

    loadProjects();
  }, []);

  const handleProjectClick = (projectKey) => {
    const selectedProject = projects.find((project) => project.key === projectKey);
    navigation.navigate('CreateProject', { selectedProject });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Projects</Text>
      {projects.map((project) => (
        <TouchableOpacity
          key={project.key}
          style={styles.projectItem}
          onPress={() => handleProjectClick(project.key)}
        >
          <Text style={styles.projectText}>Project {project.key.split('project')[1]}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  projectItem: {
    backgroundColor: 'lightgray',
    padding: 20,
    marginBottom: 16,
    borderRadius: 5,
  },
  projectText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
