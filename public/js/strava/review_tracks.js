function reviewTracks(trackData, runData){
    console.log(trackData, "track data");
    console.log(runData, "run data");
    let top3 = [{average_pace:0},{average_pace:0},{average_pace:0}]; //Creates array with average pace 0 for sorting
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

        let changed = false;
        for (let r = 0; r<top3.length; r++){ //Filters fastest songs into top 3.
            if(top3[r].average_pace < trackData[t].average_pace & changed == false){
                top3[r]=trackData[t]
                changed = true;
            }
        }
    }
    console.log(top3)
    let firstString = `${top3[0].songName} by ${top3[0].artistName} running at ${top3[0].average_pace.toFixed(4)} kph (grade adjusted).`
    let secondString = `${top3[1].songName} by ${top3[1].artistName} running at ${top3[1].average_pace.toFixed(4)} kph (grade adjusted).`
    let thirdString = `${top3[2].songName} by ${top3[2].artistName} running at ${top3[2].average_pace.toFixed(4)} kph (grade adjusted).`
    
    document.getElementById("first").innerHTML = firstString
    document.getElementById("second").innerHTML=secondString
    document.getElementById("third").innerHTML=thirdString

    createImg(0, top3)
    createImg(1, top3)
    createImg(2, top3)
    return top3
}
export {reviewTracks}

function createImg(index, top3){
    let imageUrl = "../views/src/defaultArt.jpg"
    if (top3[index].imgUrl !== ""){
        imageUrl = top3[index].imgUrl;
    }
    // Create an img element
    let imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.alt = "Album Art";
        
    // Optionally, set width and height
    imgElement.width = 100;
    imgElement.height = 100;

    // Append the image to the desired element
    document.getElementById(`album${index}`).appendChild(imgElement);
    

    }

window.createImg= createImg;