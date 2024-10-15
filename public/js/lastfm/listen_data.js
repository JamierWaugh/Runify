function songsCall(api_key, start, end) {
    const call = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=JamieWaugh&from=${start}&to=${end}&api_key=${api_key}&format=json`;
    return fetch(call, {method: "get"})
        .then((response) => response.json())
            .then((data) => {
                let trackList = data.recenttracks.track;
                console.log(trackList);
                let bySecond = [];
                for (let i = trackList.length-1; i >= 0; i--){ /*Loops through all tracks in order of listen time (first song in run first) */
                    if (trackList[i]["@attr"] == undefined){ /*Excludes currently playing song */
                    bySecond.push({mbid: trackList[i].mbid, timeStart: trackList[i].date.uts - start, songName: trackList[i].name , artistName: trackList[i].artist["#text"]})
                    } /*Creating an array of classes that holds mbid and timestart, but also artist name and song name incase mbid is empty */
                    
                }
                console.log(bySecond)
                return bySecond
            })
        }


export {songsCall}