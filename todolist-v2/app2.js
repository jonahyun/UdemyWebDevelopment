const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const app = express();
const _ = require("lodash");
const { urlencoded } = require("body-parser");

app.set("view engine", "ejs");

app.use(bodyParser,urlencoded({extended:true}));
app.use(express.static("public");

//Open Connection
mongoose.connect('mongodb://localhost:27017/todolistDB2', {useNewUrlParser: true});

//item Schema
const itemSchema = new mongoose.Schema({
    name: String
});

// Item Model - Singluar Model
const Item = mongoose.model("Item", itemSchema);

// Add new item from model
const item1 = new Item({
    name: "Add Your Task"
});

const item2 = new Item({
    name: "Task Now"
});

const defaultItems = [item1, item2];

// listSchema
const listSchema = new mongoose.Schema({
    name: String,
    items: [itemsSchema]
});

// List Model
const List = mongoose.model("List", listSchema);


// Add List Item 
app.get("/", function(req, res){
    
    Item.find({}, function(err, foundItems) {

        if(foundItem.length === 0) {
            if(err) {
                console.log(err);
            } else {
                console.log("Successfully added to Database");
            }
            res.redirect("/");

        } else {
            res.render("list", {listTitle: "Today", newListItems: foundItems})
        }

    });

});


// Custom List by URL
app.get("/:customListName", function(req, res) {

    const customListName = _.lowerCase(req.params.customListName);

    List.findOne({name:customListName}, function(err, foundList){
        if(!err) {
            if(!foundList) {
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                res.redirect("/" + customListName);
            } else {
                res.render("list", {listTitle: foundList.name, newListItems: foundList.items});

            }
        }
    });

});


app.post("/", function(req, res) {
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    });

    if(listName === "Today") {
        item.save();
        res.redirect("/");
    } else {
        List.findOne({name: listName}, function(err, foundList){
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName)
        });
    }

});


app.post("/delete", function(req, res){
    const deleteItem = req.body.checkbox;
    const listName = req.body.listName;

    Item.findByIdAndRemove(deleteItem, function(err){
        if(err) {
            console.log(err);
        } else {
            console.log("Successfully deleted: " + deletedItem);
        }
    })
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});