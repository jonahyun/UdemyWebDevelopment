const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
  res.send("You are here");
});

app.listen(3000, function(req, res){
  console.log("The server is alive on 3000");
});

// 676d40b35b02c0a5470d0b93c7d653de-us8