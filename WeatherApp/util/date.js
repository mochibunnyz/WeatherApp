export function toTimeSlice(date){
    newDate = new Date(date);
    const options = { hour: '2-digit', minute: '2-digit', hour12: true};
    return newDate.toLocaleTimeString('en-SG', options);
}

export function getFormattedDate(date){
    newDate = new Date(date);
    const options = {
        weekday: 'short', // Abbreviated day of the week (e.g., "Sat")
        day: '2-digit',   // Day of the month with leading zeros (e.g., "16")
        month: 'short',   // Abbreviated month name (e.g., "Sep")
        year: 'numeric',  // Full year (e.g., "2023")
    };
    return newDate.toLocaleDateString('en-SG', options);
    
}

export function toTime(date){
    return date.toLocaleTimeString();
}



//get sun time with time and timezone given in consideration
export function formatSunTime(timestamp, timezone){
    // get the time based on the timezone given
    const adjustedTimestamp = timestamp + timezone;
    // Create a new Date object adjusted for the timezone offset
    const date = new Date(adjustedTimestamp * 1000);
    //format time in 12 hour format
    const time = getTimeFormat(date);
    return time;
};

//get date and time with time and timezone given in consideration
export function formatDateTime(timestamp, timezone) {
    // get the time based on the timezone given
    const adjustedTimestamp = timestamp + timezone;
    // Create a new Date object adjusted for the timezone offset
    const date = new Date(adjustedTimestamp * 1000);

    // Get date components
    // Format the date as "DD MMM YYYY" (e.g., "19 Sep 2023")
    const formattedDate = `${date.getUTCDate()} ${getMonthAbbreviation(date.getUTCMonth())} ${date.getUTCFullYear()}`;

    // Get time components
    //formate time in 12 hour format 
    const formattedTime = getTimeFormat(date);

    return `${formattedDate}, ${formattedTime}`;
}

//get current time with time zone given inconsideration
export function formatDateWithTimezoneOffset(timezone) {
    // Create a Date object
    const currentDate = new Date();

    // Convert the Date object to epoch time in milliseconds
    const epochTime = currentDate.getTime();

    // Add the timezone offset in milliseconds to the epoch time
    const adjustedTime = epochTime + timezone * 1000;

    // Create a new Date object with the adjusted time
    const adjustedDate = new Date(adjustedTime);

    // Format the date as "DD MMM YYYY" (e.g., "19 Sep 2023")
    const formattedDate = `${adjustedDate.getUTCDate()} ${getMonthAbbreviation(adjustedDate.getUTCMonth())} ${adjustedDate.getUTCFullYear()}`;

    //formate time in 12 hour format 
    const formattedTime = getTimeFormat(adjustedDate);

    return `${formattedDate}, ${formattedTime}`;
}

// Helper function to get the month abbreviation
export function getMonthAbbreviation(month) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month];
}

//helper function to formate time
export function getTimeFormat(date){
    // Format the time in 12-hour format with AM/PM (e.g., "03:45 PM")
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const newTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    return newTime;
}


//get date time and timezone given in consideration
export function formatDate(timestamp, timezone) {
    // get the time based on the timezone given
    const adjustedTimestamp = timestamp + timezone;
    // Create a new Date object adjusted for the timezone offset
    const date = new Date(adjustedTimestamp * 1000);

    // Get date components
        // Format the date as "DD MMM YYYY" (e.g., "19 Sep 2023")
    const formattedDate = `${date.getUTCDate()} ${getMonthAbbreviation(date.getUTCMonth())} ${date.getUTCFullYear()}`;


    return formattedDate;
}
