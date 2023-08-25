export function toTimeSlice(date){
    newDate = new Date(date);
    return newDate.toLocaleTimeString();
}