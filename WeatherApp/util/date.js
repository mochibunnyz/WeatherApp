export function toTimeSlice(date){
    newDate = new Date(date);
    return newDate.toLocaleTimeString();
}

export function getFormattedDate(date){
    newDate = new Date(date);
    return newDate.toDateString();
    
}

export function toTime(date){
    return date.toLocaleTimeString();
}