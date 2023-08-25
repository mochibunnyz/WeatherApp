import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { FontAwesome5,MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const ExtraInfo = ({location}) =>{

    return(
        <View style={styles.extraInfoContainer}>
            <Text style={styles.title}>More Information</Text>

            {/* 1st row */}
            <View style={styles.row}>
                {/* Feels like  */}
                <TouchableOpacity>
                    <View style={styles.infoContainer}>
                        <View style={styles.headerContainer}>
                            <FontAwesome5 name="temperature-low" size={17} color="rgba(255, 255, 255, 0.6)" />
                            <Text style={styles.header}>Feels like</Text>
                        </View>
                        <Text style={styles.text}>{(location.main.feels_like).toFixed(1)} °</Text>
                    </View>
                </TouchableOpacity>

                {/* Humidity  */}
                <TouchableOpacity>
                    <View style={styles.infoContainer}>
                        <View style={styles.headerContainer}>
                            <MaterialCommunityIcons name="air-humidifier" size={17} color="rgba(255, 255, 255, 0.6)" />
                            <Text style={styles.header}>Humidity</Text>
                        </View>
                        <Text style={styles.text}>{location.main.humidity} %</Text>
                    </View>
                </TouchableOpacity>

            </View>

            {/* 2nd row */}
            <View style={styles.row}>
                {/* wind  */}
                <TouchableOpacity>
                    <View style={styles.infoContainer}>
                        <View style={styles.headerContainer}>
                            <FontAwesome5 name="wind" size={17} color="rgba(255, 255, 255, 0.6)" />
                            <Text style={styles.header}>Wind</Text>
                        </View>
                        <Text style={styles.text}>{location.wind.speed} m/s</Text>
                    </View>
                </TouchableOpacity>

                {/* Visibility  */}
                <TouchableOpacity>
                    <View style={styles.infoContainer}>
                        <View style={styles.headerContainer}>
                            <MaterialIcons name="visibility" size={17} color="rgba(255, 255, 255, 0.6)" />
                            <Text style={styles.header}>Visibility</Text>
                        </View>
                        <Text style={styles.text}>{location.visibility} km</Text>
                    </View>
                </TouchableOpacity>

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