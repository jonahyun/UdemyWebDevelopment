const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const date = require(__dirname + "/date.js");

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

const items = ["Buy Food", "Cook Food", "Eat"];
const workItems = ["programming", "fixing house"];

app.get("/", function(req, res){
  // res.sendFile(__dirname + "/index.html");
  const day = date.getDay();
  res.render("list", {listTitle: day, newListItems: items}); //render - ejs function
});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work", newListItems: workItems});
});

app.get("/about", function(req,res){
  res.render("about");
});
 
app.listen(3000, function(req, res){
  console.log("The server is running on 3000");
});