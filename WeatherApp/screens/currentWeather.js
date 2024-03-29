import {View, Text, StyleSheet,ScrollView, SafeAreaView, Image, ImageBackground, Button, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { apiKey } from '../keys/weatherAPIKey';
import ErrorOverlay from '../UI/ErrorOverlay';
import LoadingOverlay from '../UI/LoadingOverlay';
import ExtraInfo from '../components/extraInfo';
import HourlyForecast from '../components/HourlyForecast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from "expo-notifications";
import { schedulePushNotification, scheduleWeatherNotification } from '../util/handle-local-notification';
import { useLocalNotification } from "../util/useLocalNotification";
import { ChangeBackground } from '../components/background';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false
    })
});


function Weather({navigation}){

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [hourlyData, setHourlyData] = useState([]);
    const [showHourlyForecast, setShowHourlyForecast] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false); // State to track scrolling
    
    useLocalNotification();
      
    

    useEffect(()=>{
        
        
        (async()=>{
            //request for permission to get location 
            let{status} = await Location.requestForegroundPermissionsAsync();
            if(status !== 'granted'){
                setErrorMsg("Permission Denied");
                return;
            }
            //retrieve asyncstorage data if any
            const savedLocationData = await AsyncStorage.getItem('locationData');
            const savedBackgroundImage = await AsyncStorage.getItem('BackgroundData');
            
            //if there is savedbackground image, set it first
            if(savedBackgroundImage){
                let savedImage= ChangeBackground(JSON.parse(savedBackgroundImage));
            }

            //get current locatioon of user
            loc = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
            
            //fetch data from api using current location
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&appid=${apiKey}&units=metric`,{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then((response) =>{
                if(response.status ==200){
                    // If response is 200, proceed with JSON parsing
                    return response.json();
                }
                else{
                    //schedule weather if no response from api
                    if (savedLocationData) {
                        // If location data is found in AsyncStorage, parse and set it
                        setLocation(JSON.parse(savedLocationData));
                        //let newWeather= ChangeBackground(JSON.parse(savedBackgroundImage));
                        const imageSource = ChangeBackground(JSON.parse(savedBackgroundImage));
                        setBackgroundImage(imageSource);
                        //set pushNotification
                        scheduleWeatherNotification(location.weather[0].main);
                        
                        console.log("current weather data retrieved from async")
                    } 
                   
                    
                }
                
            })
            .then((json) =>{
                if(json){
                    // If data is available (either from API or AsyncStorage), proceed
                    console.log(json);
                    //save data in location variable 
                    setLocation(json);
                    // After setting location data in state, save it to AsyncStorage
                    AsyncStorage.setItem('locationData', JSON.stringify(json));
                    // Determine the background image based on weather condition
                    const weatherCondition = json.weather[0].main.toLowerCase();
                   
                    const imageSource = ChangeBackground(weatherCondition);
                    setBackgroundImage(imageSource);
                    AsyncStorage.setItem('BackgroundData',  JSON.stringify(weatherCondition));
                    //setPushreminder
                    // Schedule a notification based on the weather condition
                    scheduleWeatherNotification(weatherCondition);
                    
                }
                else {
                    // Handle the case where there is no data from API or AsyncStorage
                    if(!location){
                        console.log('No data available.');
                    }
                    else{
                        console.log('unable to use data from api. Use data from AsyncStorage');
                        //get location data from async
                        
                       
                    }
                    
                }

            })
            .catch((error)=>{
                console.log(error);
                
            })
            

            
        })();
        
    }, []);
    

    if (errorMsg !== null){
        //set error msg alert
        return <ErrorOverlay message={errorMsg} />;
    }
    // Event handler for scroll
    const handleScroll = (event) => {
        // Check if the user is scrolling
        if (event.nativeEvent.contentOffset.y > 0) {
            setIsScrolling(true);
        } else {
            setIsScrolling(false);
        }
    };


    
    if(location == null){
        //waiting
        return <LoadingOverlay/>;
    }
    
    function fetchHourlyForecast(){
        setShowHourlyForecast(!showHourlyForecast);
    }

    return(
        <View style={styles.container}>
            <ImageBackground
                source = {backgroundImage}
                //source = {require('../assets/Images/rain.jpg')}
                style={styles.backgroundImage} 
                resizeMode="cover"
                imageStyle={{opacity: 0.7}}
            >

                <Text style = {styles.title}>
                    Current Weather
                </Text>
                <View style={isScrolling? styles.smallCurrentTempContainer:styles.currentTempContainer}>
                    <Text style={styles.locationText}>
                        {location.name}
                    </Text>
                    <View style={styles.tempContainer}>
                        <Image
                            source={{uri:`https://openweathermap.org/img/wn/${location.weather[0].icon}@2x.png`}}
                            style={isScrolling ? styles.smallIcon: styles.bigIcon}
                        />
                        <Text style={isScrolling? styles.smallTempText: styles.tempText}>{(location.main.temp).toFixed(1)} °C</Text>

                    </View>
                    {!isScrolling &&(
                        <Text style={styles.descriptionText}>{location.weather[0].description}</Text>
                    )}
                    
                </View>
                <ScrollView style={styles.scroll} onScroll={handleScroll} scrollEventThrottle={16}>

                    {/* Show hourly forecast button */}
                    {!showHourlyForecast && (
                    <View style={styles.forecastContainer}>
                        <TouchableOpacity style={styles.ButtonStyle} onPress={fetchHourlyForecast}>
                            <Text style= {styles.buttonText}>Click to Show Forecast</Text>
                        </TouchableOpacity>
                    </View>
                    
                    )}

                    {/* Hourly Forecast */}
                    {showHourlyForecast &&(<HourlyForecast/>)}
                    
                    <ExtraInfo weatherData = {location}/>
                </ScrollView>
                
            </ImageBackground>
        </View>
    );
}

export default Weather;

const styles = StyleSheet.create({
    container:{
        flex:1,
        //alignItems:'center'

    },
    scroll:{
        marginHorizontal:10,
    },
    
    title:{
        textAlign:'center',
        fontSize:36,
        fontWeight:'bold',
        color:'white',
        marginTop:50
    },
    currentTempContainer:{
        backgroundColor:'rgba(52, 52, 52, 0.5)',
        borderRadius:10,
        paddingVertical:15,
        marginTop:10,
        
    },
    smallCurrentTempContainer:{
        backgroundColor:'rgba(52, 52, 52, 0.3)',
        borderRadius:10,
        paddingVertical:15,
        marginTop:10,
        paddingHorizontal:75,
        marginBottom:10,
        
    },
    locationText:{
        textAlign:"center",
        fontSize:20,
        fontWeight:'400',
        color:'white',

    },
    bigIcon:{
        width:150, 
        height:150,
        marginRight:10,
    },
    smallIcon:{
        width:50, 
        height:50,
        marginRight:10,
    },
    tempContainer:{
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop:5,
        alignItems:'center',
        marginHorizontal:5,
    },
    tempText:{
        fontSize:38,
        fontWeight:'bold',
        marginRight:40,
        color:'white',
    },
    smallTempText:{
        fontSize:20,
        fontWeight:'bold',
        marginRight:40,
        color:'white',
    },
    descriptionText:{
        textAlign:'center',
        fontSize:20,
        color:'white',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent:'flex-start',
        alignItems: 'center',
    },
    forecastContainer:{
        marginTop:20,
        minHeight:150,
        marginHorizontal:5,
        backgroundColor:'rgba(52, 52, 52, 0.5)',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    ButtonStyle:{
        borderColor:'white',
        borderWidth:1,
        borderRadius:20,
        padding:10
    },
    buttonText:{
        color:'white'
    }
    
});