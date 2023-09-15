import {View,Text, TextInput, StyleSheet,Dimensions, Alert} from 'react-native';
import React,{useState} from 'react';
import { FontAwesome  } from '@expo/vector-icons';

function WeatherSearch({fetchWeatherData}){
    const [cityName, setCityName]= useState('');

    function handleSearch(){
        if (cityName.trim() === '') {
          // Show an alert or error message to inform the user to enter a city name.
          Alert.alert('Empty Field', 'Please enter a city or country name to search for weather.');
        } else {
          // Call the fetchWeatherData function with the entered city name.
          fetchWeatherData(cityName);
        }
    };

    return(
        <View style = {styles.searchBar}>
            <TextInput
                placeholder='Search for a City or Country'
                placeholderTextColor={'white'}
                value={cityName}
                onChangeText={(text)=> setCityName(text)}
                style={styles.inputStyle}
            />
            <FontAwesome name ='search' size={28} colour='white' onPress={handleSearch}/>
        </View>
    )
}

export default WeatherSearch;

const styles = StyleSheet.create({
    searchBar:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:Dimensions.get('screen').width - 20,
        
        paddingVertical:10,
        marginHorizontal:15,
        paddingHorizontal:15,
        backgroundColor:'rgba(52, 52, 52, 0.7)',
        
        borderRadius:20
    },
    inputStyle:{
        minWidth:290,
        color:'white'
    }
})