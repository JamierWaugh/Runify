import {skey, lkey} from "../../../keys.js"

import {readCode} from "../../../controllers/stravaCode.js"

export function gen(){
    let url = new URL(window.location.href);
    if (url.searchParams.has("code")){
        let code = readCode(url);
        console.log(code)
        fetch(`https://www.strava.com/oauth/token?client_id=${skey.clientId}&client_secret=${skey.clientSecret}&code=${code}&grant_type=authorization_code`, {method: "post"})
            .then((response) => response.json())
                .then(info =>{
                        if (skey.refreshToken == ""){
                            skey.refreshToken = info.refresh_token
                        } //This code does nothing as it can't edit another file
                        console.log(info.refresh_token, "refresh_token")
                    })
    }
    else {
        console.log("No code")
    }
}

window.gen = gen;