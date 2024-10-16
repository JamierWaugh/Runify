import {skey} from "../../../keys.js"

export function authStrava(){
    console.log(skey.clientId)
    let cb = "http://127.0.0.1:5500/Projects/Runify/views/callback.html"
    // Redirect to strava for Oauth authorization
    window.location.href = `https://www.strava.com/oauth/authorize?client_id=${skey.clientId}&redirect_uri=${cb}&response_type=code&scope=activity:read_all`
}

window.authStrava = authStrava;