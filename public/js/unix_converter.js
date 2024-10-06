
export function convertUnix(start_time){
    const unixTimestamp = new Date(start_time).getTime() / 1000;
    return unixTimestamp
}



