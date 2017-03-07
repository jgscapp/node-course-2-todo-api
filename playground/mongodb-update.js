const {MongoClient, ObjectID} = require('mongodb');  //same code as above



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb serve');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('58bec2a64cd57476a1567b81')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });


  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('58bec6774cd57476a1567c6e')
  }, {
    $set: {
      name: 'Gerardo S'
    },
      $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

   //db.close();
 });
