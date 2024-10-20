function songsCall(api_key, user_name,start, end) {
    const call = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user_name}&from=${start}&to=${end}&api_key=${api_key}&format=json`;
    return fetch(call, {method: "get"})
        .then((response) => response.json())
            .then((data) => {
                let trackList = data.recenttracks.track; /*Takes only the track data*/
                let bySecond = [];
                let lengthOfRun = end - start
                let duration;
                for (let i = trackList.length-1; i >= 0; i--){ /*Loops through all tracks in order of listen time (first song in run first) */
                    if (trackList[i]["@attr"] == undefined){ /*Excludes currently playing song */
                        if (i>0){ //If not the last song, look at the next song and take away start time to find duration
                            duration = trackList[i-1].date.uts - trackList[i].date.uts
                        }
                        else{ //If final song, look at total duration and substitute from that
                            duration = lengthOfRun - (trackList[i].date.uts - start)
                        }
                    bySecond.push({mbid: trackList[i].mbid, timeStart: trackList[i].date.uts - start, duration: duration,songName: trackList[i].name , artistName: trackList[i].artist["#text"]})
                    } /*Creating an array of classes that holds mbid and timestart, but also artist name and song name incase mbid is empty */
                    
                }
                return bySecond
            })
        }


export {songsCall}