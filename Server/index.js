const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
    fs.appendFile("./text.js", `${Date.now()} User Enter at that time in the ${req.url}\n`, (err) => {
        switch(req.url) {
            case '/': res.end("Hello Welcome to Homepage!");
            break
            case '/contact-us': res.end("Aditya: +919876543210");
            break
            case '/about': res.end("I know you are User");
            break
            default: res.end("Lol Page not found");
        }
    })
})

myServer.listen(5173, () => { console.log("Server Started!") });