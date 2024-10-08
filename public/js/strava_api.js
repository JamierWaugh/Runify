import key from "./keys.js";
import {convertUnix} from "./public/js/unix_converter.js";
/* Calls in keys from file */
/* Calls in convertUnix function */
const auth_link = "https://www.strava.com/oauth/token"

/*Creates get request for all activity data from user*/
function getActivities(res){
    console.log(res)
    console.log(res.access_token)
    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`
    fetch(activities_link)
        .then((res) =>res.json())
            .then((res) => filterActivities(res)) /*Need to fix return on filterActivites*/

    
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
            client_id: key.clientId,
            client_secret: key.clientSecret,
            refresh_token: key.refreshToken,
            grant_type: "refresh_token",
        })
    }).then(res => res.json())
        .then((res) => getActivities(res))
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

getAccess()

getActivities()



