// Git and Github Setup

// Git Setup / Use
// 1. Download Git (Homebrew)
// 2. Sign up / Login to Github
// 3. Setup SSH for the computer you are using
// 4. Start using git including you can clone existing project or start new git project by initilizing Git.

// Note setting up Express Server with Node
// 1. Download Node (That comes with package manager)
// 2. Setup Express "npm install express --save". This is global setup, you can do it from any directory
// 3. Initialize new npm project: "npm init" (from new project folder)
// 4. Setup express "npm install express"
// 5. On your server.js file, require express and setup route. example below.

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));  // everytime using body-parser 

app.get("/",function(req,res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var result = num1 * num2;
    res.send("The results of calculation is " + result);
});

// Start server
app.listen(3000, function(){
    console.log("server is running on 3000 bitches!");
});