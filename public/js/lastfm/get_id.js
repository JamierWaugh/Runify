import {loadStatic} from "./static_key.js"

import {authlf} from "./auth_lf.js"

import {readToken} from "../../../controllers/callback.js"
//import all functions for generating session key

export function getId(){
    let url = new URL(window.location.href);
    if (url.searchParams.has("token")){ //If token is present in url
        let token = readToken() //Read token
        console.log(token, "token")
        loadStatic(token) //Generate session key and id number
    }

    else {
        console.log("Expecting Token")
    }
    
}

window.getId = getId;