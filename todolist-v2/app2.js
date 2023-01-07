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
    name: String
});

// List Model
const List = mongoose.model("List", listSchema);

app.get("/", function(req, res){
    
    Item.find({}, function(err, foundItem) {

        

    });

});