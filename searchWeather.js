import {View, Text, StyleSheet,ScrollView, SafeAreaView, Image, ImageBackground, Button, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import { apiKey } from '../keys/weatherAPIKey';
import ErrorOverlay from '../UI/ErrorOverlay';
import LoadingOverlay from '../UI/LoadingOverlay';
import ExtraInfo from '../components/extraInfo';
import WeatherSearch from '../components/Search';


function SearchWeather(){
    const[weatherData, setWeatherData]= useState(null);
    const[loaded, setLoaded] = useState(false);
   

    //add function to fetch weather data
    const fetchWeatherData = async(cityName)=>{
        try{
            setLoaded(false);
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
            if (response.status == 200){
                const data = await response.json();
                setWeatherData(data);
                
            }
            else{
                setWeatherData(null);
            }
            setLoaded(true);
        }
        catch(error){
            console.log(error);
        }
        
    }
    //remember my city name
    useEffect(()=>{
        fetchWeatherData('Singapore');
    },[]);



    //if data not loaded, show loading overlay
    if(!weatherData){
        return <LoadingOverlay/>
    }
    
    return(
        <View style={styles.container}>
            <ImageBackground
                //source = {backgroundImage}
                source = {require('../assets/Images/rain.jpg')}
                style={styles.backgroundImage} 
                resizeMode="cover"
                imageStyle={{opacity: 0.7}}
            >

                <Text style = {styles.title}>
                    Weather
                </Text>
                <WeatherSearch fetchWeatherData = {fetchWeatherData}/>
                <View style ={styles.currentTempContainer}>
                    <Text style={styles.locationText}>
                        {weatherData.name}
                    </Text>
                    <View style={styles.tempContainer}>
                        <Image
                            source={{uri:`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}}
                            style={styles.bigIcon}
                        />
                        <Text style={styles.tempText}>{(weatherData.main.temp).toFixed(1)} °C</Text>

                    </View>
                    <Text style={styles.descriptionText}>{weatherData.weather[0].description}</Text>
                </View>
                <ScrollView 
                
                    style={styles.scroll} 
                
                >
                    <ExtraInfo location = {weatherData} />
                    
                </ScrollView>
                
            </ImageBackground>
        </View>
    );
}

export default SearchWeather;
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
        marginTop:60
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