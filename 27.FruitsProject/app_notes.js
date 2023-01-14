const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// Open connection
mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema ({
  name: String,
  rating: Number,
  review: String
});

// Mongo wants a singular form  they will turn into pluralize form for the collection.
// Also, it needs be a string in quotes.. example "Fruit"
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit"
});

// Add bunch of fruits in bulk.
const kiwi = new Fruit ({
  name: "kiwi",
  rating: 6,
  review: "Little sour"
});

const orange = new Fruit({
  name: "orange",
  rating: 7,
  review: "Better than an Apple"
});

const banana = new Fruit({
  name: "Banana",
  rating: 9,
  review: "Monkeys love banana"
});

// Add many into database
// takes two parameters 1. array of objects 2. Call back for errors

// Fruit.insertMany([kiwi, orange, banana], function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("successfully saved to fruitsDB");
//   }
// }); 

// Read from database
// on callback function with two paramerters 1. Err  2. fruits (this one you can call whaver you want
Fruit.find(function(err, fruits){ 
  if(err) {
    console.log(err);
  } else {

    // Close Connection
    
    // This outputs as array of javascript objects that we can work with in the app.js
    // console.log(fruits);

    // specific item
    fruits.forEach(function(fruit) {
      console.log(fruit.review);
    });
    mongoose.connection.close();
    // As for loop
    // for (let i=0; i < fruits.length; i++) {
    //   console.log(fruits[i].name + ": " + fruits[i].rating);
    // };


  }
});


// fruit.save();

// const personSchema = new mongoose.Schema ({
//   name: String,
//   age: Number
// });

// const Person = mongoose.model("Person", personSchema);

// const person = new Person ({
//   name: "John",
//   age: 32
// });

// person.save();


// const productSchema = new mongoose.Schema ({
//   product_name: String,
//   cost: Number,
//   quantity: Number,
//   colors: Boolean
// });

// const Product = mongoose.model("Product", productSchema);

// const product = new Product ({
//   product_name: "iPad",
//   cost: 300,
//   quanity: 20,
//   colors: false
// });

// product.save();