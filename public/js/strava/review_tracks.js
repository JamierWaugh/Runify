function reviewTracks(trackData, runDataParsed, c){
    console.log(trackData, "trackdata") //Currently passing an empty array when no songs are listened, this outputs empty values and causes erros
    let runData = runDataParsed.data
    let top3 = [{average_pace:0},{average_pace:0},{average_pace:0}]; //Creates array with average pace 0 for sorting
    let sum = 0;
    let count = 0;
    let averagePace;
    let t = 0;
    let presentData = true;
    if (trackData.length !== 0){
    for (let i = trackData[0].timeStart; i<runData.time.data.length; i++){ //Only loop through run length
            if ((runData.time.data[i] > trackData[t].timeStart) && (runData.time.data[i] < (trackData[t].timeStart + trackData[t].duration))){ //Increment t if outside of t'\s bounds
                sum = runData.velocity_smooth.data[i] + sum
                count = count + 1
                } // Now much more optimised , previously trackLength * runLength * 3 now just runLength*3. O(3N)
            else{
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
                
                t = t+1
            }
    }
        
    console.log(top3, "top3")
    let firstString = `${top3[0].songName} by ${top3[0].artistName} running at ${mphConvert(top3[0].average_pace).toFixed(4)} mph average pace.`
    let secondString = `${top3[1].songName} by ${top3[1].artistName} running at ${mphConvert(top3[1].average_pace).toFixed(4)} mph average pace.`
    let thirdString = `${top3[2].songName} by ${top3[2].artistName} running at ${mphConvert(top3[2].average_pace).toFixed(4)} mph average pace.`
    
    document.getElementById(`first${c}`).innerHTML = firstString
    document.getElementById(`second${c}`).innerHTML=secondString
    document.getElementById(`third${c}`).innerHTML=thirdString

    createImg(0, top3,c)
    createImg(1, top3,c)
    createImg(2, top3,c)
        
    }
    else{
        presentData = false
    }
    changeTitle(presentData, c)
}
export {reviewTracks}

function createImg(index, top3,c){
    let imageUrl = "../views/src/defaultArt.jpg"
    if (top3[index].imgUrl !== ""){
        imageUrl = top3[index].imgUrl;
    }
    // Create an img element
    let imgElement = document.createElement(`img`);
    imgElement.src = imageUrl;
    imgElement.alt = "Album Art";
        
    // Optionally, set width and height
    imgElement.width = 100;
    imgElement.height = 100;

    // Append the image to the desired element
    document.getElementById(`album${index}${c}`).appendChild(imgElement);
    

    }

function changeTitle(presentData, c){
    document.getElementById(`title${c}`).innerHTML=`Run ${c+1}`
    if (presentData == false){
        document.getElementById(`first${c}`).innerHTML="No music data present"
    }
}

function mphConvert(ms){ //conversion from m/s to mph
    return ms*2.23694
}
window.createImg= createImg;