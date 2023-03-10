// Note setting up Express Server with Node
// 1. Download Node (That comes with package manager)
// 2. Setup Express "npm install express --save". This is global setup, you can do it from any directory
// 3. Install Nodemon 'Sudo npm install -g nodemon"
// 4. Initialize new npm project: "npm init" (from new project folder)
// 5. Setup express "npm install express"
// 6. Setup body-parser for forms - "npm install body-parser"
// 6. On your server.js file, require express and setup route. example below.

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
});``