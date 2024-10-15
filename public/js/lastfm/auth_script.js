import {lkey} from "../../../keys.js";

export function auth(){
    const body = new URLSearchParams({ /*Used to direct to callback and load token */
        api_key: lkey.api_key,
        cb: "http://127.0.0.1:5500/Projects/Runify/views/callback.html"
    }).toString()
    return window.location.href = "https://www.last.fm/api/auth?" + body
}; 

window.auth = auth;