import {lkey} from "../../../keys.js"

import {songsCall} from "./listen_data.js"

import {reviewTracks} from "../strava/review_tracks.js"


export function compilingData(runData,count){ //Brings in data from strava and lastfm
    let startTime = runData.start
    let endTime = runData.end
    songsCall(lkey.api_key,lkey.user_name,startTime,endTime) /*Gets list of all songs between this time*/
        .then((bySecond)=>{
            reviewTracks(bySecond,runData,count) /*Passing data to reviewTracks function which will also have strava data */
        })
}

window.compilingData = compilingData;









  