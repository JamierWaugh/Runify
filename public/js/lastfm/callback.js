import {lkey} from "../../../keys.js"

import {songsCall} from "./listen_data.js"

import {reviewTracks} from "../strava/review_tracks.js"

let start = 1726401498
let end = 1726402675
export function compilingData(runData){ //Brings in data from strava and lastfm
    songsCall(lkey.api_key,lkey.user_name,start,end) /*Gets list of all songs between this time*/
        .then((bySecond)=>{
            reviewTracks(bySecond,runData) /*Passing data to reviewTracks function which will also have strava data */
        })
}

window.compilingData = compilingData;









  