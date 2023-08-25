import { ActivityIndicator, View, StyleSheet, Text } from "react-native";


function LoadingOverlay(){
    return <View style={styles.container}>
        <Text>This will take a while, Please be patient</Text>
        <ActivityIndicator size="large" color="#2d0689"/>
    </View>
}

export default LoadingOverlay;

const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"white"

    }
});