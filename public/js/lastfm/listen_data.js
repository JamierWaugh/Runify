function songsCall(api_key, user_name,start, end) {
    const call = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user_name}&from=${start-600}&to=${end}&api_key=${api_key}&format=json`;
    return fetch(call, {method: "get"})
        .then((response) => response.json())
            .then((data) => {
                let trackList = data.recenttracks.track; /*Takes only the track data*/
                let bySecond = [];
                let lengthOfRun = end - start
                let duration;
                let added = false;
                let filteredTracks = trackList.filter(track => !track['@attr'] || track['@attr'].nowplaying !== 'true'); //remove currently playing songs, either no @attr or nowplaying = false
                for (let i = filteredTracks.length-1; i >= 0; i--){ /*Loops through all tracks in order of listen time (first song in run first) */
                    let time_start = filteredTracks[i].date.uts - start;
                        if (i>0){ //If not the last song, look at the next song and take away start time to find duration
                            duration = filteredTracks[i-1].date.uts - filteredTracks[i].date.uts
                        }
                        else{ //If final song, look at total duration and substitute from that
                            duration = lengthOfRun - (time_start)
                        }
                    //This can be extended to hold more data
                    if (time_start < 0 && added == false){ //Incorporates 10 minute buffer to make time_start = 0 on songs that began before run started
                        duration = duration + time_start
                        time_start = 0
                        added = true //Ensures only the most recent song in the 10 minutes before is incorporated. Not sure if this is needed but better to have it incase.
                    }
                    bySecond.push({mbid: filteredTracks[i].mbid, timeStart: time_start, duration: duration,songName: filteredTracks[i].name , artistName: filteredTracks[i].artist["#text"], imgUrl: filteredTracks[i].image[2]["#text"]})
                    } /*Creating an array of classes that holds mbid and timestart, but also artist name and song name incase mbid is empty */
                return bySecond
            })
        }


export {songsCall}