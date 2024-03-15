export function getFormattedDate(inputdate){
    
    return inputdate.toISOString().slice(0,10);
}

export function getDateMinusDays(date, days){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
