export function formatSunTime(timestamp, timezone){
    // Assuming location.timezone contains the timezone offset in seconds
    const timeNow = new Date().getTimezoneOffset();
    const adjustedTimestamp = timestamp + timezone;
    // Create a new Date object adjusted for the timezone offset
    const date = new Date(adjustedTimestamp * 1000);
    /* // Format the sunrise time as a string
    const time = date.toUTCString();; */
    console.log(date.toUTCString());
    // Get hours and minutes in UTC
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    // Determine AM or PM
    const period = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    const hours12Hour = hours % 12 || 12; // 0 should be displayed as 12 in 12-hour format

    // Format the time as a string
    const time = `${hours12Hour}:${minutes.toString().padStart(2, "0")} ${period}`;
    return time;
};

export function formatDateTime(timestamp, timezone) {
    const adjustedTimestamp = timestamp + timezone;
    const date = new Date(adjustedTimestamp * 1000);
  
    // Get date components
    const day = date.getUTCDate();
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();
  
    // Get time components
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
  
    // Determine AM or PM
    const period = hours >= 12 ? "PM" : "AM";
  
    // Convert hours to 12-hour format
    const hours12Hour = hours % 12 || 12; // 0 should be displayed as 12 in 12-hour format
  
    // Format the date and time as a string
    const formattedDateTime = `${day} ${month} ${year},  ${hours12Hour}:${minutes.toString().padStart(2, "0")} ${period}`;
  
    return formattedDateTime;
}
  
  
