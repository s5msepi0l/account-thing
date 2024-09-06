const express = require("express");
const cookie_parser = require("cookie-parser");
var fs = require("fs");

const server = express();

const port = 1234;
var cookieIndex = 0; // funkar ig?
var cookieset = new Set(); // hashset, check if cookie exists in list of valid sessions

server.use(cookie_parser());
server.use(express.urlencoded());
server.use(express.json());
server.use(express.static("template"));
server.listen(port);

//slow af but it works ig :)(
function fetch_user(uname) {
    const udata = JSON.parse(fs.readFileSync("users.json")).users;
    for(let i = 0; i<udata.length; i++) {
        if (udata[i].username === uname) 
            return udata[i];
    }

    return null
}

server.post("/signup", (req, res) => {
    const loginData = JSON.parse(fs.readFileSync("users.json")); // check if username is taken
    const data = req.body;

    if (fetch_user(data.username) == null) { // username not taken
        loginData.users.push(data);
        fs.writeFileSync("users.json", JSON.stringify(loginData));
        res.send("User succesfully registered");    
    }

    });

server.post("/login", (req, res) => {
    const loginData = JSON.parse(fs.readFileSync("users.json"));

    const data = req.body;

    console.log(loginData.password);
    console.log(data)
    
    if (loginData[data.username] === data.password && data.username !== undefined ) { // correct password
        console.log(data);
        console.log("Wight password");
        cookieIndex++;
        res.cookie("session-cookie", cookieIndex);
        cookieset.add(cookieIndex);
        
        res.send(`
            <!DOCTYPE html>
            <html>
                <head>
                    <meta http-equiv="refresh" content="0; url=private"/>
                </head>

                <body>
                    <p><a href="private">Redirect</a></p>
                </body>
            </html>
        `);
            return ;
    } else { // undefined, Incorrect password
        console.log("Wong password");

    }
    
    res.json({
        msg: "wrong password"
    });
});

//detele cookie auth token from hashset
server.post("/logout", (req, res) => {

});

server.get("/private", (req, res) => {
    
    console.log(cookieset.has(req.cookies["session-cookie"]));
    console.log(typeof req.cookies["session-cookie"])
    if (cookieset.has(parseInt(req.cookies["session-cookie"]))) { //valid session :)
        console.log("Here");
        res.send(`
            <html>
            ${fs.readFileSync("template/private.html")}
            </html>
            `
            );
    } else {
        console.log("Not Here");
        res.send("Wrong password");
    } 
    console.log(req.cookies);
})