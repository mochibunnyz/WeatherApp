import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Weather from './screens/currentWeather';
import HourlyDetails from './screens/HourlyDetails';
import HourlyForecast from './components/HourlyForecast';


const Tab = createBottomTabNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen 
          name="CurrentWeather" 
          component={Weather}  
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="HourlyForecast" 
          component={HourlyForecast}  
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="HourlyDetails" 
          component={HourlyDetails}  
          options={{ 
            headerShown: true, 
            title:'Forecast',
            headerTintColor: '#fff', 
            headerStyle:styles.header
          }}

        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  header:{
    backgroundColor:'black',
  }
});
