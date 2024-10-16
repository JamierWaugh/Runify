import {lkey} from "../../../keys.js";

export function authlf(){
    /*Used to direct to callback and load token */
    let api_key = lkey.api_key;
    let cb = "http://127.0.0.1:5500/Projects/Runify/views/index.html";
    return window.location.href = `https://www.last.fm/api/auth?api_key=${api_key}&cb=${cb}`
}; 

window.authlf = authlf;