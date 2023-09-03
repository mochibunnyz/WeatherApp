import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";




export const scheduleWeatherNotification = async (weatherCondition) => {
  // Define notification content based on weather condition
  let notificationContent = {
    title: 'Weather Update',
    body: `Current Weather: ${weatherCondition}`,
  };

  // Schedule the notification
  await Notifications.scheduleNotificationAsync({
    content: notificationContent,
    trigger: {seconds:5}, // You can set a specific trigger if needed
  });
};
  
export async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync({
          projectId: 'c1aa6f7f-d51e-4bb5-9917-6d28355fc39d',
      })).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
}