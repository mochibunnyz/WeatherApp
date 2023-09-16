import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Weather from './screens/currentWeather';
import HourlyDetails from './screens/HourlyDetails';
import HourlyForecast from './components/HourlyForecast';
import SearchWeather from './screens/searchWeather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()

function BottomTabs(){
  return(
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: { position: 'absolute' },
      headerShown: false ,
      tabBarStyle:{backgroundColor:'black', height:90, paddingBottom:20,  },
      tabBarActiveTintColor: 'white',
    }}> 
      {/* current weather page */}
      <Tab.Screen 
        name="CurrentWeather" 
        component={Weather} 
        options={{
          tabBarLabel:"Current",
          tabBarIcon:({ color, size }) =>(<Ionicons name="partly-sunny-outline"  color={color} size={size} />),    
        }}
      />
      {/* search page */}
      <Tab.Screen 
        name="SearchWeather" 
        component={SearchWeather} 
        options={{
            tabBarLabel:"Search",
            tabBarIcon:({ color, size }) =>(<Ionicons name="search"  color={color} size={size} />),
            
        }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        {/* <Stack.Screen 
          name="CurrentWeather" 
          component={Weather}  
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen 
          name="Weather" 
          component={BottomTabs}  
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
  },
  barStyle:{
    backgroundColor:'rgba(52, 52, 52, 0.5)'
  },
});
