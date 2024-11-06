// App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { Plugins } from '@capacitor/core';

const { HealthKit } = Plugins;

export default function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [stepCount, setStepCount] = useState(null);

  // Function to handle HealthKit data fetching
  const fetchHealthData = async () => {
    try {
      // Request permission to access HealthKit data
      await HealthKit.requestAuthorization({
        read: ['stepCount'],
      });

      // Fetch step count data for the last 7 days
      const steps = await HealthKit.getStepCount({
        startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
        endDate: new Date(),
      });

      setStepCount(steps.value);
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch HealthKit data.');
      console.error(error);
    }
  };

  // Handle button press to display message and fetch HealthKit data
  const handlePress = () => {
    setMessage(`Hello ${name}, congratulations on your new app!`);
    fetchHealthData();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your New App!</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={(text) => setName(text)}
        value={name}
      />

      <Button title="Submit" onPress={handlePress} />

      {message ? <Text style={styles.message}>{message}</Text> : null}
      {stepCount !== null ? (
        <Text style={styles.stepCount}>Step Count (Last 7 Days): {stepCount}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '80%',
    marginBottom: 20,
    borderRadius: 5,
  },
  message: {
    fontSize: 18,
    marginTop: 20,
    color: 'green',
  },
  stepCount: {
    fontSize: 18,
    marginTop: 20,
    color: 'blue',
  },
});
