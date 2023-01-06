const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const app = express();
const_ = require("lodash");

const date = require(__dirname + "/date.js");

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

const tasks = ["Buy Food", "Cook Food", "Eat"];
const workTasks = ["programming", "fixing house"];


app.get("/", function(req, res){
  const day = date.getDay();
  res.render("todo", {listTitle: day, newTasks: tasks});
});


app.get("/work", function(req, res){
  res.render("todo", {listTitle: "Work", newTasks: workTasks})
});

app.post("/", function(req, res) {
  const task = req.body.newTask;
  if(req.body.button === "Work") {
    workTasks.push(task);
    res.redirect("/work");
  } else {
    tasks.push(task);
    res.redirect("/");
  }
});



app.listen(4000, function(req, res) {
  console.log("It's the 4000 bitches!");
});