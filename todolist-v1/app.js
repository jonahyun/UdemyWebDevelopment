const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function(req, res){
  // res.sendFile(__dirname + "/index.html");
  var today = new Date();
  var currentDay = today.getDay();
  var day = "";

  // if (currentDay === 6 || currentDay === 0) {
  //   day = "Weekend";
  // } else {
  //   day = "Weekday";
  // }

  switch (currentDay) {
    case 0:
      day = "Sunday";
      break;
    case 1: 
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    default:
      console.log("Its one of them days");
  }


  res.render("list", {kindOfDay: day});
});

app.listen(3000, function(req, res){
  console.log("The server is running on 3000");
});