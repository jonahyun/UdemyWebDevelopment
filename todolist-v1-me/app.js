const express = require("express");
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.use(express.static("public"));

var tasks = ["Take out the trash", "study programming"];
app.get("/", function(req, res){
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric"
  }
  var day = today.toLocaleDateString("en-US", options);

  res.render("todo", {newTasks: tasks, myDay: day});
});

app.post("/", function(req, res) {
  var task = req.body.newTask;
  tasks.push(task);
  res.redirect("/");
});












// app.post("/", function(req, res) {
//   var task = req.body.newTask;
//   tasks.push(task);
//   res.redirect("/");
// });


app.listen(4000, function(req, res) {
  console.log("It's the 4000 bitches!");
});