import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { FontAwesome5,MaterialCommunityIcons, MaterialIcons, Feather } from '@expo/vector-icons';
//import { formatSunTime, formatDateTime } from "./time";
import { formatSunTime,formatDateTime } from "../util/date";


const ExtraInfo = ({weatherData}) =>{

    

    const sunriseTime = formatSunTime(weatherData.sys.sunrise, weatherData.timezone);
    const sunsetTime = formatSunTime(weatherData.sys.sunset, weatherData.timezone);
    const time = formatDateTime(weatherData.dt,weatherData.timezone);


    return(
        <View style={styles.extraInfoContainer}>
            <Text style={styles.title}>More Information</Text>
            <Text style={styles.dateTimeText}>Data last retrieved: {time}</Text>

            {/* 1st row */}
            <View style={styles.row}>
                {/* Min Temp  */}
                
                <View style={styles.infoContainer}>
                    <View style={styles.headerContainer}>
                        <FontAwesome5 name="temperature-low" size={17} color="rgba(255, 255, 255, 0.6)" />
                        <Text style={styles.header}>Min. Temp</Text>
                    </View>
                    <Text style={styles.text}>{(weatherData.main.temp_min).toFixed(1)} °</Text>
                </View>
                

                {/* Max temp  */}
                
                <View style={styles.infoContainer}>
                    <View style={styles.headerContainer}>
                        <FontAwesome5 name="temperature-high" size={17} color="rgba(255, 255, 255, 0.6)" />
                        <Text style={styles.header}>Max. Temp</Text>
                    </View>
                    <Text style={styles.text}>{(weatherData.main.temp_max).toFixed(1)} °</Text>
                </View>
                

            </View>

            {/* 2nd row */}
            <View style={styles.row}>
                {/* Feels like  */}
                
                <View style={styles.infoContainer}>
                    <View style={styles.headerContainer}>
                        <FontAwesome5 name="temperature-low" size={17} color="rgba(255, 255, 255, 0.6)" />
                        <Text style={styles.header}>Feels like</Text>
                    </View>
                    <Text style={styles.text}>{(weatherData.main.feels_like).toFixed(1)} °</Text>
                </View>
                

                {/* Humidity  */}
                
                <View style={styles.infoContainer}>
                    <View style={styles.headerContainer}>
                        <MaterialCommunityIcons name="air-humidifier" size={17} color="rgba(255, 255, 255, 0.6)" />
                        <Text style={styles.header}>Humidity</Text>
                    </View>
                    <Text style={styles.text}>{weatherData.main.humidity} %</Text>
                </View>
                

            </View>

            {/* 3rd row */}
            <View style={styles.row}>
                {/* wind  */}
                
                <View style={styles.infoContainer}>
                    <View style={styles.headerContainer}>
                        <FontAwesome5 name="wind" size={17} color="rgba(255, 255, 255, 0.6)" />
                        <Text style={styles.header}>Wind</Text>
                    </View>
                    <Text style={styles.text}>{weatherData.wind.speed} m/s</Text>
                </View>
                

                {/* Visibility  */}
                
                <View style={styles.infoContainer}>
                    <View style={styles.headerContainer}>
                        <MaterialIcons name="visibility" size={17} color="rgba(255, 255, 255, 0.6)" />
                        <Text style={styles.header}>Visibility</Text>
                    </View>
                    <Text style={styles.text}>{weatherData.visibility} km</Text>
                </View>
                

            </View>

            {/* 4th row */}
            <View style={styles.row}>
                {/* sunrise  */}
                
                <View style={styles.infoContainer}>
                    <View style={styles.headerContainer}>
                        <Feather name="sunrise" size={17} color="rgba(255, 255, 255, 0.6)" />
                        <Text style={styles.header}>Sunrise</Text>
                    </View>
                    <Text style={styles.text}>{sunriseTime} </Text>
                </View>
                

                {/* Sunset  */}
                
                <View style={styles.infoContainer}>
                    <View style={styles.headerContainer}>
                        <Feather name="sunset" size={17} color="rgba(255, 255, 255, 0.6)" />
                        <Text style={styles.header}>Sunset</Text>
                    </View>
                    <Text style={styles.text}>{sunsetTime}</Text>
                </View>
                

            </View>

            
        </View>
    );
}

export default ExtraInfo;
const styles = StyleSheet.create({

    extraInfoContainer:{
        flex:1,
        marginTop:30
    },
    row:{
        flexDirection: "row",
        justifyContent: "space-between",
    },
    infoContainer:{
        width:Dimensions.get('screen').width/2.3,
        backgroundColor:'rgba(52, 52, 52, 0.5)',
        alignItems:'center',
        margin:5,
        borderRadius:10,
        padding:10,

    },
    dateTimeText:{
        marginLeft:10,
        fontSize:15,
        fontWeight:'200',
        color:'white',
        marginBottom:10

    },
    headerContainer:{
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingVertical:10,
        
    },
    text:{
        color:'white',
        fontSize:25,
        fontWeight:"bold",
        paddingVertical:10,
    },
    header:{
        color:'rgba(255, 255, 255, 0.6)',
        fontWeight:'400',
        marginLeft:5,
        fontSize:15
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'white',
        marginLeft:10,
    },
})