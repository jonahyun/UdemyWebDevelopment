const express = require('express');
const bodyParser = require("body-parser");
const app = express();
// const date = require(__dirname + "/date.js");

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));


const workItems = ["bring coffee","brown nose", "kiss ass"];
const items = ["one", "two", "three"];


app.get("/", function(req, res) {
  res.render("todo", {listTitle:"To Dos", items:items});
});

app.get("/work", function(req,res) {
  res.render("todo", {listTitle: "Work", items: workItems});
});

app.post("/", function(req,res) {
  const item = req.body.newListItem;
  if (req.body.button === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
  items.push(item);
  res.redirect("/");
  }
});


app.listen(3300, function(req,res) {
  console.log("Server is live at 3300");
});