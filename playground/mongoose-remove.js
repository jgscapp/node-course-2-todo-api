const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

//Todo.findOneAndRemove
// Todo.findByIdAndRemove

Todo.findOneAndRemove({_id: '58c0576b6daa04d466b189eb'}).then((todo) => {

});


Todo.findByIdAndRemove('58c0576b6daa04d466b189eb').then((todo) => {
  console.log(todo);
});
