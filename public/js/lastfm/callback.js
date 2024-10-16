import {lkey} from "../../../keys.js"

import {songsCall} from "./listen_data.js"

import {reviewTracks} from "../strava/review_tracks.js"

songsCall(lkey.api_key,1726401498,1726402675) /*Gets list of all songs between this time*/
    .then((bySecond)=>{
        reviewTracks(bySecond) /*Passing data to reviewTracks function which will also have strava data */
    })










  