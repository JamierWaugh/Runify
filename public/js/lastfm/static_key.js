import {readToken} from "../../../controllers/callback.js"

import {md5} from "../global/md5_script.js"

import {lkey} from "../../../keys.js"

function loadStatic(){
    console.log("Happening")
    const keys = {
        api_key: lkey.api_key,
        secret_key: lkey.secret_key,
        token: readToken(),
        method: "auth.getSession",
    }

    let body = new URLSearchParams({
        api_key: keys.api_key,
        token: keys.token,
        api_sig: md5((`api_key${keys.api_key}method${keys.method}token${keys.token}${keys.secret_key}`)),
        format: "json"

    }).toString()
    console.log(body)
    const call = "http://ws.audioscrobbler.com/2.0/?method=auth.getSession&" + body 
    fetch(call, {method: "post"})
        .then((response) => {return response.json()})
            .then((data) => {
                const session = data.session
                console.log(session.key) /* outputs lifetime session key */

            })
    
    
}

window.loadStatic = loadStatic;