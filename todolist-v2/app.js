//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false)
const app = express();
const _ = require("lodash");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Open connection

mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true});


// itemsSchema
const itemsSchema = new mongoose.Schema ({
  name: String
});
// use singluar model name ex, "Item"
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item ({
  name: "Pickup Dog Food"
});

const item2 = new Item ({
  name: "Feed Pimple"
});

const item3 = new Item ({
  name: "Check House"
});

const defaultItems = [item1, item2, item3];

// listSchema
const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema]

});

// use singluar model name ex, "List"
const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {

  Item.find({}, function(err,foundItems) {

    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err){
        if (err) {
          console.log(err)
        } else {
          console.log("Successfully added to DB");
        }
      });
      res.redirect("/");
      
    } else {
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
    
  });
  
});



app.get("/:customListName", function(req,res){
  const customListName = _.lowerCase(req.params.customListName);
  
  List.findOne({name: customListName}, function(err, foundList){
    if (!err) {
      if (!foundList) {
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        // Show an existing list
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
      }
    }
    
  }) 

});





app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item ({
    name: itemName
  });

  if(listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  };
});

app.post("/delete", function(req,res){
  const deleteItem = req.body.checkbox;
  const listName = req.body.listName;

  Item.findByIdAndRemove(deleteItem, function(err){
    if(err) {
      console.log(err);
    } else {
      console.log("Successfully Deleted: " + deleteItem);
      res.redirect("/");
    }
  });
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
