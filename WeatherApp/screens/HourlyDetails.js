import React, { useState } from 'react';
import { View, Text, StyleSheet,ImageBackground,Image, ScrollView } from 'react-native';
import HourlyInfo from '../components/HourlyInfo';
import { toTimeSlice, getFormattedDate } from '../util/date';

function HourlyDetails({ route }){
  const { forecastData} = route.params; // Get the selected forecast data from route param
  
  return (
    <View style={styles.container}>
        <ImageBackground
            source = {require('../assets/Images/clear.jpg')}
            style={styles.backgroundImage} 
            resizeMode="cover"
            imageStyle={{opacity: 0.7}}
        >
            {/* Display the details of the selected forecast */}
            <View style={styles.mainDetail}>
                <Text style={[styles.dateText]}>{getFormattedDate(forecastData.time)}</Text>
                <View style={styles.tempContainer}>
                    <Text style={styles.tempText}>{(forecastData.temp).toFixed(1)} °C</Text>
                    <Image
                        source={{uri:`https://openweathermap.org/img/wn/${forecastData.icon}@2x.png`}}
                        style={styles.smallIcon}
                    />

                </View>
                <Text style={[styles.dateText]}>{toTimeSlice(forecastData.time)}</Text>
                
            </View>
            <ScrollView>
                <HourlyInfo forecastData={forecastData}/>
            </ScrollView>
            
        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainDetail:{
        marginTop:15,
        alignItems:'flex-start'

    },
    tempContainer:{
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop:5,
        alignItems:'center',
        marginHorizontal:5,
    },
    text: {
        fontSize: 18,   
        marginBottom: 10,
        color:'white'
    },
    dateText:{
        fontWeight:'bold',
        marginRight:160,
        fontSize: 18, 
        color:'white',
        

    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent:'flex-start',
        alignItems: 'center',
    },
    smallIcon:{
        width:100, 
        height:100,
        marginLeft:10,
    },
    tempText:{
        fontSize:25,
        fontWeight:'bold',
        color:'white',
    },
    
});

export default HourlyDetails;