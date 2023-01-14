const express = require("express"); 
const app = express();
const bodyParser = require("body-parser"); // use to post form data
const https = require("https"); 
require('dotenv').config();

// console.log(process.env); // Check envirnoment variables

app.use(bodyParser.urlencoded({extended:true})); // For nested 
app.use(express.static("public")); //allow to use static css and images folder


// Route to Main page
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

// Handle form post request
app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  
  // JSON Data format
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  // string data format to send to Mailchimp
  const jsonData = JSON.stringify(data);

  // us8 is specific to user and list ID at the end
  const url = "https://us8.api.mailchimp.com/3.0/lists/5f23e46090";

  const options = {
    method: "POST",
    auth: process.env.API_KEY
  }

  const request = https.request(url, options, function(response) {
    
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    };

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
    
  });

  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res) {
  res.redirect("/");

})

app.listen(process.env.PORT || 3000, function(req, res){
  console.log("The server is alive on 3000");
});

