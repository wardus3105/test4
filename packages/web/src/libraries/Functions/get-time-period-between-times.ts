export default function haveSameTimePeriod(startTime: Date, endTime: Date){
    if(startTime && endTime){
        const start = startTime.getTime();
        const end = endTime.getTime(); 
        const seconds = Math.abs(end - start) / 1000;
        if(seconds < 60){
            return true;
        }
        return false;
    }
    return false;
}

