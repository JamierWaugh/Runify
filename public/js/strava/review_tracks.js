function reviewTracks(trackData, runData){
    console.log(trackData, "track data");
    console.log(runData, "run data");
    let top3 = ["","",""];
    let sum = 0;
    let count = 0;
    let averagePace;
    for (let t = 0; t< trackData.length -1; t++){
        for (let i = 0; i<runData.time.data.length; i++){
            if ((runData.time.data[i] >= trackData[t].timeStart)){ //&& (runData.time.data[i] <= (trackData[t].timeStart + trackData[t].duration))){
                sum = runData.velocity_smooth.data[i] + sum
                count = count + 1

            }
            } //Currently O(N^2), would prefer O(N)
        averagePace = sum /count; 
        trackData[t].average_pace = averagePace; //Appends average GAP onto the song data
        sum = 0;
        count = 0; //Resets variables after each pass through
    }
}
export {reviewTracks}