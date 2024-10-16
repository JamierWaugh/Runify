export function readCode(){
    const url = new URL(window.location.href); /*Reads token from url */
    console.log(url);

    const params = new URLSearchParams(url.search);
    const token = params.get('code');
    return code
}