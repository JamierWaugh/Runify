import {skey} from "../../keys.js";
import {convertUnix} from "./unix_converter.js";
/* Calls in keys from file */
/* Calls in convertUnix function */
const auth_link = "https://www.strava.com/oauth/token"

/*Creates get request for all activity data from user*/
function getActivities(d){
    const accessT = d.access_token
    console.log(accessT, "access") /*Reads it just fine? Still pushing errors on line 9*/
    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${accessT}`
    fetch(activities_link)
        .then((res) =>res.json())
            .then((res) => filterActivities(res)) /*Need to fix return on filterActivites*/
    activityData(accessT)
    getStreams(accessT)
}

/*Provides access key dynamically by using refresh token*/
function getAccess(){
    fetch(auth_link,{
        method: "post",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            client_id: skey.clientId,
            client_secret: skey.clientSecret,
            refresh_token: skey.refreshToken,
            grant_type: "refresh_token",
        })
    }).then((res) => res.json())
        .then(data => getActivities(data))
}

/*Filters activities to only include runs - this could be broadend as app is developed */
function filterActivities(res){
    let time = []
    for (let i = 0; i < res.length; i++){
        if (res[i].type != "Run"){
            res.splice(i,1)
            
            
        }
        else{
            time.push({id: res[i].id, start_time: convertUnix(res[i].start_date), duration: res[i].elapsed_time})
        }
    }
    console.log(res)
    console.log(time)
    
    return res
}

function activityData(accessT){
    fetch("https://www.strava.com/api/v3/activities/12415852967",{ /*Change the id to have whichever the user has submitted */
        method:"GET",
        headers:{
            "Authorization": `Bearer ${accessT}`
        }
    })
    .then((response) => response.json())
        .then((data) => getSplits(data))

}

function getStreams(accessT){
    let streams = "time,velocity_smooth,grade_smooth"
    fetch(`https://www.strava.com/api/v3/activities/12415852967/streams?keys=${streams}&key_by_type=true`, {
        method:"GET",
        headers:{
            "Authorization": `Bearer ${accessT}`
        },
    })
    .then((response) => response.json())
        .then((data) => console.log(data))

}

function getSplits(data){ /*Converting split data into time stamp for music stats */
    console.log(data)
    const splits = data.splits_metric /*Relying on splits data per km */
    console.log(splits)
    let highest_GAP = {GAP: 0, pointer: -1,time:0}
    for (let i = 0; i < splits.length; i++){
        if (splits[i].average_grade_adjusted_speed > highest_GAP.GAP){
            highest_GAP.pointer = i
            highest_GAP.GAP = splits[i].average_grade_adjusted_speed
        }

    }
    if (highest_GAP.pointer == 0){
        highest_GAP.time = splits[0].elapsed_time
    }
    else{
        for (let t = 0; t < highest_GAP.pointer; t++){
            highest_GAP.time += splits[t].elapsed_time
        }
    }
    
    console.log(highest_GAP.time)
    console.log(highest_GAP.GAP)
}

getAccess()

getActivities()




