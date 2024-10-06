function auth(){
    const body = new URLSearchParams({
        api_key: "42e73efade36ebbeaa804a3bbdcc3d08",
        cb: "http://127.0.0.1:5500/Projects/Runify/views/callback.html"
    }).toString()
    return window.location.href = "https://www.last.fm/api/auth?" + body
}; 