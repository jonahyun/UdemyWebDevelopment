const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// Open connection
mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    // required: [true, "No Name Specified!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});


// Mongo wants a singular form  they will turn into pluralize form for the collection.
// Also, it needs be a string in quotes.. example "Fruit"
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  name: "Apple",
  rating: 9,
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

const pineapple = new Fruit({
  name: "Pineapple",
  rating: "7",
  review: "The best apple is Pine"
});

pineapple.save();


// Fruit.insertMany([kiwi, orange, banana], function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("successfully saved to fruitsDB");
//   }
// }); 


// Fruit.find(function(err, fruits){ 
//   if(err) {
//     console.log(err);
//   } else {

//     fruits.forEach(function(fruit) {
//       console.log(fruit.review);
//     });

//     mongoose.disconnect();
//   }
// });




// Fruit.deleteOne({_id:"63b4789b8cba04cd046c2d4a"}, function(err){
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted");
//   };
// });

// fruit.save();

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

// const person = new Person ({
//   name: "Amy",
//   age: 16,
//   favoriteFruit: pineapple
// });


Person.updateOne({_id: "63b47ea2cf00af2e961ce220"}, {favoriteFruit: orange}, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("succesfully updated");
  };
});

// person.save();


// Person.deleteMany({name:"John"}, function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Removed all Johns")
//   }
// });