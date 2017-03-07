// const MongoClient = require('mongodb').MongoClient;
//USE destructuring
const {MongoClient, ObjectID} = require('mongodb');  //same code as above

var obj = new ObjectID();
console.log(obj);

//ES destructuring allow to take a value from an object and create a variable
var user = {name: 'Gerry', age: 47};
var {name2} = user;  //get value from name and create a variable name2
console.log(name2);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb serve');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });


//   db.collection('Users').insertOne({
//     name: 'Gerry',
//     age: 47,
//     location: 'CT'
//   }, (err, result) => {
//     if (err) {
//       return console.log('Unable to insert USER', err);
//     }
//
//     //console.log(JSON.stringify(result.ops, undefined, 2));
//     //result.ops is array of all the documents that got inserted in the table
//     console.log(result.ops[0]._id.getTimestamp());  //get timestamps from _id
//
//   });
//
//   db.close();
 });
