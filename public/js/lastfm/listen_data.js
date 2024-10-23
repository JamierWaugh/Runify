function songsCall(api_key, user_name,start, end) {
    console.log(start, end, "start, end")
    const call = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user_name}&from=${start}&to=${end}&api_key=${api_key}&format=json`;
    return fetch(call, {method: "get"})
        .then((response) => response.json())
            .then((data) => {
                let trackList = data.recenttracks.track; /*Takes only the track data*/
                let bySecond = [];
                let lengthOfRun = end - start
                let duration;
                let filteredTracks = trackList.filter(track => !track['@attr'] || track['@attr'].nowplaying !== 'true'); //remove currently playing songs, either no @attr or nowplaying = false
                for (let i = filteredTracks.length-1; i >= 0; i--){ /*Loops through all tracks in order of listen time (first song in run first) */
                        if (i>0){ //If not the last song, look at the next song and take away start time to find duration
                            duration = filteredTracks[i-1].date.uts - filteredTracks[i].date.uts
                        }
                        else{ //If final song, look at total duration and substitute from that
                            duration = lengthOfRun - (filteredTracks[i].date.uts - start)
                        }
                    //This can be extended to hold more data
                    bySecond.push({mbid: filteredTracks[i].mbid, timeStart: filteredTracks[i].date.uts - start, duration: duration,songName: filteredTracks[i].name , artistName: filteredTracks[i].artist["#text"], imgUrl: filteredTracks[i].image[2]["#text"]})
                    } /*Creating an array of classes that holds mbid and timestart, but also artist name and song name incase mbid is empty */
                return bySecond
            })
        }


export {songsCall}