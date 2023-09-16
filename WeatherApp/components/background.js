import React from 'react';

export function ChangeBackground(weatherCondition){
    switch (weatherCondition) {
        case 'clear':
            return require('../assets/Images/clear.jpg');
           
        case 'clouds':
            return require('../assets/Images/cloudy3.jpg');
           
        case 'rain':
            return require('../assets/Images/rain.jpg');
            

        case 'thunderstorm':
            return require('../assets/Images/thunderstorm.jpg');
            
        
        case 'drizzle':
            return require('../assets/Images/drizzle.jpg');
           

        case 'snow':
            return require('../assets/Images/snow.jpg');
            
        // Add more cases for other weather conditions
        default:
            return require('../assets/Images/clear.jpg');
    }
    
}