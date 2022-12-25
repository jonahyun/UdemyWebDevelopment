const express = require("express");
const app = express();

// app.get("/", function(request, response) {
//     response.send("<h1>Hello, world!</h1>");
// });

app.get("/", function(req, res) {
    res.send("Whatever");
});

app.get("/contact", function(req, res){
    res.send("<h2>Contact me at jona@gmail.com</h2");
});

app.get("/about", function(req, res){
    res.send("This is Jona\'s Page")
});

app.get("/hobbies", function(req, res){
    res.send("Collecting Baseball cards")
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});``