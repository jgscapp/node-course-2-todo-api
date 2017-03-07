var mongoose = require('mongoose');

mongoose.Promise = global.Promise;  //do it only once  to use promises
mongoose.connect('mongodb://localhost:27017/TodoApp');

//create a model  to tell mongoose how Todo is designed
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

// var newTodo = new Todo({
//   text: 'Cook dinner'
// });
//
// newTodo.save().then((doc) => {
//   console.log('Save todo', doc);
// }, (e) => {
//   console.log('Unabel to save Todo');
// });


// var otherTodo = new Todo({
//   text: 'Watch TV',
//   completed: true,
//   completedAt: 123
// });
//
// otherTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save', e);
// });
//

//user
// email - require it - trim it - set type - set min lenght of 1
var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});


var user = new User({
 email: '  myemail@hotmail.com  '
});

user.save().then((doc) => {
  console.log('User save', doc);
}, (e) => {
  console.log('Unable to save user', e);
});
