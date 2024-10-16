export function readCode(url){
    /*Reads token from url */
    console.log(url);
    const params = new URLSearchParams(url.search);
    const code = params.get('code');
    console.log(code)
    return code
}