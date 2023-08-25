import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { apiKey } from '../keys/weatherAPIKey';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, Image } from "react-native";
import { FontAwesome5,MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { toTimeSlice } from '../util/date';

const HourlyForecast = ({ hourlyData }) =>{
    //const [forecastData, setForecastData]  = useState([]);

    

    const renderItem = ({ item }) => (
        <View style={styles.hourlyItem}>
            <Text style={styles.text}>{toTimeSlice(item.time)}</Text>
            <Text style={styles.text}>{item.temp} °C</Text>
            <Image
                source={{uri:`https://openweathermap.org/img/wn/${item.icon}@2x.png`}}
                style={styles.smallIcon}
            /> 
            <Text style={styles.text}>{item.description}</Text>
        </View>
    );
    

    return(
        <View style={styles.hourlyContainer}>
            <Text style={styles.hourlyTitle}>3 Hourly Forecast</Text>
            <FlatList
                data={hourlyData.slice(1,10)}
                keyExtractor={(item) => item.time}
                renderItem={renderItem}
                horizontal
            />


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
    }
})