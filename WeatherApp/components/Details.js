import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Details({ route }){
  const { forecastData } = route.params; // Get the selected forecast data from route params

  return (
    <View style={styles.container}>
      {/* Display the details of the selected forecast */}
      <Text style={styles.text}>Time: {forecastData.time}</Text>
      <Text style={styles.text}>Temperature: {forecastData.temp} °C</Text>
      <Text style={styles.text}>Description: {forecastData.description}</Text>
      {/* You can add more details here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Details;