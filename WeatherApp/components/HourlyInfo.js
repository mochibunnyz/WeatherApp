import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { FontAwesome5,MaterialCommunityIcons, MaterialIcons, Feather } from '@expo/vector-icons';

const HourlyInfo = ({forecastData}) =>{

   
    return(
        <View style={styles.extraInfoContainer}>
            <Text style={styles.title}>Forecast: {forecastData.description}</Text>

            {/* 1st row */}
            <View style={styles.row}>
                {/* Min Temp  */}
                
                <View style={styles.infoContainer}>
                    <View style={styles.headerContainer}>
                        <FontAwesome5 name="temperature-low" size={17} color="rgba(255, 255, 255, 0.6)" />
                        <Text style={styles.header}>Min. Temp</Text>
                    </View>
                    <Text style={styles.text}>{(forecastData.minTemp).toFixed(1)} °</Text>
                </View>
                

                {/* Max temp  */}
                
                <View style={styles.infoContainer}>
                    <View style={styles.headerContainer}>
                        <FontAwesome5 name="temperature-high" size={17} color="rgba(255, 255, 255, 0.6)" />
                        <Text style={styles.header}>Max. Temp</Text>
                    </View>
                    <Text style={styles.text}>{(forecastData.maxTemp).toFixed(1)} °</Text>
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
                    <Text style={styles.text}>{(forecastData.feelsLike).toFixed(1)} °</Text>
                </View>
                

                {/* Humidity  */}
                
                <View style={styles.infoContainer}>
                    <View style={styles.headerContainer}>
                        <MaterialCommunityIcons name="air-humidifier" size={17} color="rgba(255, 255, 255, 0.6)" />
                        <Text style={styles.header}>Humidity</Text>
                    </View>
                    <Text style={styles.text}>{forecastData.humidity} %</Text>
                </View>
                

            </View>

            {/* 3rd row */}
            <View style={styles.row}>
                {/* Visibility  */}
                
                <View style={styles.infoContainer}>
                    <View style={styles.headerContainer}>
                        <MaterialIcons name="visibility" size={17} color="rgba(255, 255, 255, 0.6)" />
                        <Text style={styles.header}>Visibility</Text>
                    </View>
                    <Text style={styles.text}>{forecastData.visibility} km</Text>
                </View>
                

                {/* clouds */}
                
                <View style={styles.infoContainer}>
                    <View style={styles.headerContainer}>
                        <FontAwesome5 name="cloud" size={17} color="rgba(255, 255, 255, 0.6)" />
                        <Text style={styles.header}>Cloudiness</Text>
                    </View>
                    <Text style={styles.text}>{forecastData.clouds} %</Text>
                </View>
                

            </View>

            {/* 4th row */}
            <View style={styles.row}>
                {/* wind  */}
                
                <View style={styles.infoContainer}>
                    <View style={styles.headerContainer}>
                        <FontAwesome5 name="wind" size={17} color="rgba(255, 255, 255, 0.6)" />
                        <Text style={styles.header}>Wind Speed</Text>
                    </View>
                    <Text style={styles.text}>{forecastData.wind} m/s</Text>
                </View>
                

                {/* widn gust  */}
                
                <View style={styles.infoContainer}>
                    <View style={styles.headerContainer}>
                        <FontAwesome5 name="wind" size={17} color="rgba(255, 255, 255, 0.6)" />
                        <Text style={styles.header}>Wind Gust</Text>
                    </View>
                    <Text style={styles.text}>{forecastData.gust} m/s</Text>
                </View>
                

            </View>
            {/* 5th row */}
            <View style={styles.row}>
                {/* sunrise  */}
                
                <View style={styles.infoContainer}>
                    <View style={styles.headerContainer}>
                        <Feather name="sunrise" size={17} color="rgba(255, 255, 255, 0.6)" />
                        <Text style={styles.header}>Sunrise</Text>
                    </View>
                    <Text style={styles.text}>{forecastData.sunrise} </Text>
                </View>
                

                {/* Sunset  */}
                
                <View style={styles.infoContainer}>
                    <View style={styles.headerContainer}>
                        <Feather name="sunset" size={17} color="rgba(255, 255, 255, 0.6)" />
                        <Text style={styles.header}>Sunset</Text>
                    </View>
                    <Text style={styles.text}>{forecastData.sunset}</Text>
                </View>
                

            </View>


            
        </View>
    );
}

export default HourlyInfo;
const styles = StyleSheet.create({

    extraInfoContainer:{
        flex:1,
        marginTop:30,
        paddingBottom:30,
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