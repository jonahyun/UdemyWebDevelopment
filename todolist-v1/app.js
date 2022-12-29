const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

var items = ["Buy Food", "Cook Food", "Eat"];

app.get("/", function(req, res){
  // res.sendFile(__dirname + "/index.html");
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);
  res.render("list", {kindOfDay: day, newListItems: items}); //render - ejs function
});

app.post("/", function(req, res){
  var item = req.body.newItem;
  items.push(item);

  res.redirect("/"); // the newListItem must be inside app.get to be rendered.
});

app.listen(3000, function(req, res){
  console.log("The server is running on 3000");
});