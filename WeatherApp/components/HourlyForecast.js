import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { apiKey } from '../keys/weatherAPIKey';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, Image, ActivityIndicator } from "react-native";
import { FontAwesome5,MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { toTimeSlice,formatSunTime } from '../util/date';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from '../UI/LoadingOverlay';
import { useNavigation } from '@react-navigation/native';



function HourlyForecast(){
    //const [forecastData, setForecastData]  = useState([]);
    const[hourlyData,setHourlyData]= useState([])
    const [isLoading, setIsLoading] = useState(true);
    // Initialize navigation hook
    const navigation = useNavigation(); 
    

    useEffect(() => {
        const fetchData = async () => {
          try {
            const loc = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&appid=${apiKey}&units=metric`);
            const json = await response.json();
            const { sunrise, sunset, timezone } = json.city;
            const sunriseDate = formatSunTime(sunrise, timezone);
            const sundownDate = formatSunTime(sunset, timezone);
            const hourlyForecastData = json.list.map((item) => ({
              time: item.dt_txt,
              temp: item.main.temp,
              description: item.weather[0].description,
              icon: item.weather[0].icon,
              humidity: item.main.humidity,
              feelsLike: item.main.feels_like,
              visibility: item.visibility,
              wind: item.wind.speed,
              weatherCondition: item.weather[0].main,
              minTemp: item.main.temp_min,
              maxTemp: item.main.temp_max,
              gust: item.wind.gust,
              clouds: item.clouds.all,
              sunrise: sunriseDate,
              sunset: sundownDate,
              timezone: timezone,
            }));
    
            setHourlyData(hourlyForecastData);
            setIsLoading(false);
    
            // Store the data in AsyncStorage
            await AsyncStorage.setItem('hourlyData', JSON.stringify(hourlyForecastData));
          } 
          catch (error) 
          {
            console.error('Error fetching or storing hourly forecast data:', error);
    
            // If the API call fails, try to retrieve data from AsyncStorage
            try {
            const storedHourlyData = await AsyncStorage.getItem('hourlyData');
            if (storedHourlyData) {
                setHourlyData(JSON.parse(storedHourlyData));
            }
            } catch (storageError) {
            console.error('Error retrieving data from AsyncStorage:', storageError);
            }
            setIsLoading(false);
          }
        };
    
        fetchData();
    }, []);
    
    
    //render data 
    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.hourlyItem}
            onPress={() => {
                // Navigate to the ForecastDetails screen with the selected forecast data as a parameter
                try {
                    navigation.navigate('HourlyDetails', { forecastData: item  });
                  } catch (error) {
                    console.error('Navigation error:', error);
                  }
            }}
        >
            <Text style={styles.text}>{toTimeSlice(item.time)}</Text>
            <Text style={styles.text}>{(item.temp).toFixed(1)} °C</Text>
            <Image
                source={{uri:`https://openweathermap.org/img/wn/${item.icon}@2x.png`}}
                style={styles.smallIcon}
            /> 
            <Text style={styles.text}>{item.description}</Text>

        </TouchableOpacity>
        
    );
    
    

    return(
        <View style={styles.hourlyContainer}>
            <Text style={styles.hourlyTitle}>3 Hourly Forecast</Text>
            {hourlyData &&(
                <FlatList
                    data={hourlyData.slice(1,10)}
                    keyExtractor={(item) => item.time}
                    renderItem={renderItem}
                    horizontal
                />
            )}
            {!hourlyData &&(
                <View style={styles.loadingContainer}>
                    <Text>This will take a while, Please be patient</Text>
                    <ActivityIndicator size="large" color="white"/>
                </View>
                
            )}
            


        </View>
    );

}

export default HourlyForecast;
const styles = StyleSheet.create({
    hourlyContainer: {
        marginTop: 20,
        paddingHorizontal: 10,
        flex:1,
        
    },
    hourlyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'white'
    },
    hourlyItem: {
        marginRight: 20,
        padding: 10,
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        borderRadius: 10,
        width: 150,
        alignItems:'center'
    },
    smallIcon:{
        width:70, 
        height:70,
        
    },
    text:{
        color:'white'
    },
    loadingContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(52, 52, 52, 0.5)',
        minHeight:150,
        minWidth: 150,
    }
})