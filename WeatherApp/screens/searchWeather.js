import {View, Text, StyleSheet,ScrollView, SafeAreaView, Image, ImageBackground, Alert} from 'react-native';
import React, { useEffect, useState } from 'react';
import { apiKey } from '../keys/weatherAPIKey';
import ErrorOverlay from '../UI/ErrorOverlay';
import LoadingOverlay from '../UI/LoadingOverlay';
import ExtraInfo from '../components/extraInfo';
import WeatherSearch from '../components/Search';

import { formatDateWithTimezoneOffset } from '../util/date';
import { ChangeBackground } from '../components/background';




function SearchWeather(){
    const[weatherData, setWeatherData]= useState(null);
    const[loaded, setLoaded] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [isScrolling, setIsScrolling] = useState(false); // State to track scrolling
    const[dataFetched, setDataFetched] = useState(false);


    //add function to fetch weather data
    const fetchWeatherData = async(cityName)=>{
        try{
            setLoaded(false);
            setDataFetched(false);
            
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
            if (response.status == 200){
                const data = await response.json();
                setWeatherData(data);
                const weatherCondition = data.weather[0].main.toLowerCase();
                
                // Use the ChangeBackground function to get the background image
                const imageSource = ChangeBackground(weatherCondition);
                setBackgroundImage(imageSource);
                setDataFetched(true);
                
            }
            else if (response.status === 404) {
                // Handle the case where the location (city) is not found.
                setWeatherData(null);
                setDataFetched(true);
                // Inform the user that the location is not valid.
                Alert.alert('Invalid Location', 'The city or country you entered was not found.');
            }
            else{
                setWeatherData(null);
                
            }
            setLoaded(true);
        }
        catch(error){
            console.log(error);
            // Handle network or other unexpected errors.
            setWeatherData(null);
            setDataFetched(true);
            // Display an error message to the user.
            
        }
        
    }
    //remember my city name
    useEffect(()=>{
        fetchWeatherData('Singapore');
    },[]);


    // Event handler for scroll
    const handleScroll = (event) => {
        // Check if the user is scrolling
        if (event.nativeEvent.contentOffset.y > 0) {
            setIsScrolling(true);
        } else {
            setIsScrolling(false);
        }
    };
    function getTime(){
        const time = formatDateWithTimezoneOffset(weatherData.timezone);
        return time;
    }
    

    //if data not loaded, show loading overlay
    if(!loaded){
        return <LoadingOverlay/>
    }
    
    
    return(
        <View style={styles.container}>
            <ImageBackground
                source = {backgroundImage}
                //source = {require('../assets/Images/rain.jpg')}
                style={[styles.backgroundImage]}
                resizeMode="cover"
                imageStyle={{opacity: 0.7}}
            >

                <Text style = {styles.title}>
                    Weather
                </Text>
                <WeatherSearch fetchWeatherData = {fetchWeatherData}/>
                {weatherData &&(
                    <View style={styles.container}>

                        <View 
                        style={isScrolling? styles.smallCurrentTempContainer:styles.currentTempContainer}
                        >
                        <Text style={styles.locationText}>
                            {weatherData.name}
                        </Text>
                        <Text style={styles.dateTimeText}>
                            {getTime()}
                        </Text>
                        
                        <View style={styles.tempContainer}>
                            <Image
                                source={{uri:`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}}
                                style={isScrolling ? styles.smallIcon: styles.bigIcon}
                            />
                            <Text style={isScrolling? styles.smallTempText: styles.tempText}>{(weatherData.main.temp).toFixed(1)} °C</Text>

                        </View>
                        {!isScrolling && (
                            <Text style={styles.descriptionText}>{weatherData.weather[0].description}</Text>
                        )}
                        
                        </View>
                        
                        <ScrollView style={styles.scroll} onScroll={handleScroll} scrollEventThrottle={16} >
                            
                        
                            <ExtraInfo weatherData = {weatherData} />
                            
                        </ScrollView>
                </View>

                )}
                {!weatherData && dataFetched && (
                    <View style={styles.errorBox}>
                        <Text style={styles.errorMsg}>Please Key in valid City or Country to view weather data</Text>
                    </View>
                )}

                {!weatherData && !dataFetched && (
                    <View style={styles.errorBox}>
                        <Text style={styles.errorMsg}>can't fetch data from API</Text>
                    </View>
                )}
                
                
                
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
    errorMsg:{
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold',
        color:'white',
        
    },
    errorBox:{
        backgroundColor:'rgba(52, 52, 52, 0.5)',
        paddingVertical:60,
        paddingHorizontal:30,
        alignItems:'center',
        justifyContent:'center',
        marginTop:60
    },
    dateTimeText:{
        fontSize:15,
        fontWeight:'200',
        color:'white',
        textAlign:'center'

    },
    
    title:{
        textAlign:'center',
        fontSize:36,
        fontWeight:'bold',
        color:'white',
        marginTop:60,
        marginBottom:20
    },
    currentTempContainer:{
        backgroundColor:'rgba(52, 52, 52, 0.5)',
        borderRadius:10,
        paddingVertical:15,
        marginTop:20,
        paddingHorizontal:2,
        marginHorizontal:17
        
    },
    smallCurrentTempContainer:{
        backgroundColor:'rgba(52, 52, 52, 0.3)',
        borderRadius:10,
        paddingVertical:15,
        marginTop:20,
        paddingHorizontal:75,
        marginBottom:10,
        marginHorizontal:17
        
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
        marginRight:30,
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
        marginRight:30,
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