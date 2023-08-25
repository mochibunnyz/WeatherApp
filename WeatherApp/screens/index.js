import {View, Text, StyleSheet,ScrollView, SafeAreaView, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { apiKey } from '../keys/weatherAPIKey';
import ErrorOverlay from '../UI/ErrorOverlay';
import LoadingOverlay from '../UI/LoadingOverlay';
//import { SafeAreaView } from 'react-native-safe-area-context';



const Weather = () =>{

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading]= useState(null);

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

    /* else if(location !==null){
        //success
        //setIsLoading(false);
        return(
        <SafeAreaView style={styles.container}>
            <Text style = {styles.title}>
                    Current Weather
                </Text>
                <Text style = {{alignItems:'center', textAlign:'center'}} >
                    {location.name}
                </Text>
                <Image
                    source={{uri:`https://openweathermap.org/img/wn/${location.weather[0].icon}@2x.png`}}
                    style={{width:200, height:200}}
                />
        </SafeAreaView>
        )
    } */
    if(location == null){
        //waiting
        //setIsLoading(true);
        return <LoadingOverlay/>;
    }

    /* const loadForecast = async() => {
        setRefreshing(true);
        //ask for premission to access location
        const {status} = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted'){
            Alert.alert('Permission to access location was denied');
        }

        //get current location 
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});

        //fetches data from the openweathermap api
        const response = await fetch(`${uri}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
        const data = await response.json();

        if(!response.ok){
            Alert.alert('Error', 'Something went wrong');
        }
        else{
            setForecast(data);
        }

        setRefreshing(false);
    }

    useEffect(() =>{
        loadForecast();
    },[])

    //if forecast not laoded, show loading indicator
    if(!forecast){
        return(
            <SafeAreaView style={styles.loading}>
                <ActivityIndicator size ='large'/>

            </SafeAreaView>
        )
    }

    const current = forecast.current.weather[0]; */


    return(
        <View style={styles.container}>
            <Text style = {styles.title}>
                Current Weather
            </Text>
            <Text style = {{alignItems:'center', textAlign:'center'}} >
                {location.name}
            </Text>
            <Image
                source={{uri:`https://openweathermap.org/img/wn/${location.weather[0].icon}@2x.png`}}
                style={{width:200, height:200}}
            />
        </View>
    );
}

export default Weather;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ECDBBA',
        justifyContent:'flex-start',
        alignItems:'center'

    },
    
    title:{
        textAlign:'center',
        fontSize:36,
        fontWeight:'bold',
        color:'#C84B31',
        marginTop:50
    }
})