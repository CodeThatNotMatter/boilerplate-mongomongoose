
require('dotenv').config();
const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  age :  Number,
  favoriteFoods : [String]
});

var Person = mongoose.model('Person', personSchema);

var createAndSavePerson = function(done) {
  var demo = new Person({name: "Demo trail", age: 4, favoriteFoods: ["eggs", "fish", "fruit"]});
  demo.save(function(err, data) {
    if (err) 
      return console.error(err);
    done(null, data)
  });
};
//let Person ;

// const createAndSavePerson = (done) => {
//   done(null /*, data*/);
// };
var arrayOfPeople = [
  {name: "Zoro", age: 20, favoriteFoods: ["wine"]},
  {name: "Sole King", age: 76, favoriteFoods: ["Milk"]},
  {name: "Ace", age: 21, favoriteFoods: ["Meat","Fruits"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) 
      return console.error(err);
    done(null, data)
  });
};

const findPeopleByName = (personName, done) => {
   Person.find({name: personName}, function(err, data) {
    if (err) 
      return console.error(err);
    done(null, data)
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data) {
    if (err) 
      return console.error(err);
    done(null, data)
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if (err) 
      return console.error(err);
    done(null, data)
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, person) {
    if (err) 
      return console.error(err);

  person.favoriteFoods.push(foodToAdd);
    
  person.save(function(err, data) {
    if (err) 
      return console.error(err);
    done(null, data)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName},{age: ageToSet}, {new: true}, function(err, data) {
    if (err) 
      return console.error(err);
    done(null, data)
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, data) {
    if (err) 
      return console.error(err);
    done(null, data)
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  
  Person.find({favoriteFoods: foodToSearch})
  .sort({ name: 1})
  .limit(2)
  .select({ age: 0 })
  .exec(function(error, data) {
    if(error) return console.log(error);
    done(error, data)
  });

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
