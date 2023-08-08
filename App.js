import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import MaterialCommunityIcons
import React from 'react';
import { View } from 'react-native'; // Import View

import TextModel from './app/TextModel';
import DallE from './app/DallE';
import Combined from './app/Combined';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="GPT3.5"
          component={TextModel}
          options={{
            title: 'GPT 3.5',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerLeft: () => (
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="robot"
                  size={24}
                  color="blue" // Change color here
                  style={styles.icon}
                />
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="DallE"
          component={DallE}
          options={{
            title: 'DallE',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerLeft: () => (
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="robot"
                  size={24}
                  color="green" // Change color here
                  style={styles.icon}
                />
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="GPT3.5DallE"
          component={Combined}
          options={{
            title: 'GPT 3.5 + DallE',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerLeft: () => (
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="robot"
                  size={24}
                  color="purple" // Change color here
                  style={styles.icon}
                />
              </View>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = {
  iconContainer: {
    marginLeft: 10,
    borderRadius: 9999, // Make it round
    overflow: 'hidden', // Hide overflow
  },
  icon: {
    padding: 10, // Adjust padding if needed
  },
};
