const {MongoClient, ObjectID} = require('mongodb');  //same code as above



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb serve');
  }
  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Something to do'}).then((result) => {
  //   console.log(result);
  // });

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  // });

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });


  db.collection('Users').deleteMany({name: 'Dana'});

  db.collection('Users').findOneAndDelete({
    _id: new ObjectID("58be33c26b94fc17447019ff")
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  });


   //db.close();
 });
