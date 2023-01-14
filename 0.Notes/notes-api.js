// #this is notes

// - Download/Install Postman
// - Install Chrome extension - Json viewer awesome


// Make Get request to external server node
// - Use HTTP - the standard library 
// - https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
// - Once you connect to check for StatusCode
// - https status code: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
// - https://nodejs.org/api/https.html#httpsgeturl-options-callback



// Below is code snippet for weather api. 


const express = require("express");
const https = require("https");
const app = express();

app.get("/", function(req,res) {
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Cincinnati&appid=28f29551a438896271b9fb899ffa91d1&units=imperial";
  https.get(url, function(response){
    console.log(response.statusCode);

    // fetching data and convert to JSON
    response.on("data", function(data){

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      // write to page
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The temperature is " + temp + "</h1>");
      res.write("<img src=" + imageURL + ">");
      
      res.send();
    });

  });
  // res.sendFile(__dirname + "/index.html");  //Remove - You can only have one res.send (or res.sendFile) on any given methods
}); 



app.listen(3000, function() {
  console.log("Server port: 3000 Bitches!");
}); 