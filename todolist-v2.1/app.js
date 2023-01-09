//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const _ = require("lodash");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Create database
mongoose.connect("mongodb://localhost:27017/toddolistDB21", {useNewUrlParser:true});

// Create New Items Schema
const itemsSchema = {
  name: String
};

// Create Items Model
const Item = mongoose.model("Item", itemsSchema);

// Create Item and Array
const item1 = new Item ({ name: "Add Your Item" });
defaultItems = [item1];

//Inserting defaultItem Array (as documents) into Item collection
function insertDefaultItems() {
  Item.insertMany(defaultItems, function (err, results) {
    if(err) {
      console.log(err);
    } else {
      console.log(results);
    }
  });
}


app.get("/", function(req, res) {
  
  // Reading Item Collection
  Item.find({}, function(err, results) {
    
    // Checks to see if there are any items
    if(results.length === 0) {
      // if none, call insertItems() and redirect to home
      insertDefaultItems();
      res.redirect("/");
    } else {
      res.render("list", {listTitle: "Today", newListItems: results});
    }
  });
});



app.post("/", function(req, res){
  
  // Add new item
  const itemName = req.body.newItem;
  const listName = req.body.listButton;

  const newItem = new Item({ name: itemName});
  
  if(listName === "Today") {
    newItem.save(); // save to DB
    res.redirect("/"); // Show the new item on page
  } else {
    // need to look for it DB
    List.findOne({name:listName}, function(err, results){
      results.items.push(newItem);
      results.save();
      res.redirect("/" + listName);
    });
  };
});

const newLists = [];

app.post("/", function(req, res) {
  const newList = req.body.newToDoList;

  newLists.push(newList);
  console.log(newLists);
  // res.render("/", {newYesLists:newlists} )

});


app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function(err){
      if(err) {
        console.log(err);
      } else {
        console.log("Successfully deleted!")
        res.redirect("/")
      };
    });
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id:checkedItemId}}}, function(err, results){
      if(!err) {
        res.redirect("/" + listName);
      };
    });
  };



});




// Create New List Schema
const listSchema = {
  name: String, 
  items: [itemsSchema] //array item schema based items
};

// Create List Model
const List = mongoose.model("List", listSchema);

// Custom Routing
app.get("/:customListName", function(req, res){
  const customListName = _.capitalize(req.params.customListName);
  
  List.findOne({name: customListName}, function(err, results){
    if(!err) {
      if (results) {
        // exists - show an existing list
        res.render("list", {listTitle:customListName, newListItems:results.items});

      } else {
        // Does not exist - create a new list
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      };
    };
  });
});




app.listen(3030, function() {
  console.log("Server started on port 3030");
});
