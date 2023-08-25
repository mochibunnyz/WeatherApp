import {View, Text, StyleSheet,ScrollView, SafeAreaView, Image, ImageBackground} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { apiKey } from '../keys/weatherAPIKey';
import ErrorOverlay from '../UI/ErrorOverlay';
import LoadingOverlay from '../UI/LoadingOverlay';
import ExtraInfo from '../components/extraInfo';
import HourlyForecast from '../components/HourlyForecast';




const Weather = () =>{

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [hourlyData, setHourlyData] = useState([]);

    

    useEffect(()=>{
        (async()=>{
            let{status} = await Location.requestForegroundPermissionsAsync();
            if(status !== 'granted'){
                setErrorMsg("Permission Denied");
                return;
            }
            let loc = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
            
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&appid=${apiKey}&units=metric`,{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then((response) =>response.json())
            .then((json) =>{
                console.log(json);
                setLocation(json);
                // Determine the background image based on weather condition
                const weatherCondition = json.weather[0].main.toLowerCase();
                switch (weatherCondition) {
                    case 'clear':
                        setBackgroundImage(require('../assets/Images/clear.jpg'));
                        break;
                    case 'clouds':
                        setBackgroundImage(require('../assets/Images/cloudy3.jpg'));
                        break;
                    case 'rain':
                        setBackgroundImage(require('../assets/Images/rain.jpg'));
                        break;

                    case 'thunderstorm':
                        setBackgroundImage(require('../assets/Images/thunderstorm.jpg'));
                        break;
                    
                    case 'drizzle':
                        setBackgroundImage(require('../assets/Images/drizzle.jpg'));
                        break;

                    case 'snow':
                        setBackgroundImage(require('../assets/Images/snow.jpg'));
                        break;
                    // Add more cases for other weather conditions
                    default:
                      setBackgroundImage(require('../assets/Images/clear.jpg'));
                }

                 // Fetch hourly forecast data
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&appid=${apiKey}&units=metric`)
                .then((response) => response.json())
                .then((json) => {
                // Extract the hourly forecast data
                    const hourlyForecastData = json.list.map((item) => ({
                        time: item.dt_txt,
                        temp: item.main.temp,
                        description: item.weather[0].description,
                        icon: item.weather[0].icon,
                    }));
                    setHourlyData(hourlyForecastData);
                })
                .catch((error) => {
                console.error('Error fetching hourly forecast data:', error);
                });
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

    
    if(location == null){
        //waiting
        return <LoadingOverlay/>;
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
                <View style ={styles.currentTempContainer}>
                    <Text style={styles.locationText}>
                        {location.name}
                    </Text>
                    <View style={styles.tempContainer}>
                        <Image
                            source={{uri:`https://openweathermap.org/img/wn/${location.weather[0].icon}@2x.png`}}
                            style={styles.bigIcon}
                        />
                        <Text style={styles.tempText}>{(location.main.temp).toFixed(1)} °C</Text>

                    </View>
                    <Text style={styles.descriptionText}>{location.weather[0].description}</Text>
                </View>
                <ScrollView style={styles.scroll} >
                    {/* Hourly Forecast */}
                    <HourlyForecast hourlyData={hourlyData}/>
                    {/* Extra information */}
                    <ExtraInfo location = {location}/>
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
        paddingHorizontal:9,
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
    
});