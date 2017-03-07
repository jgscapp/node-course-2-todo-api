var mongoose = require('mongoose');

mongoose.Promise = global.Promise;  //do it only once  to use promises
mongoose.connect('mongodb://localhost:27017/TodoApp');


module.exports = {
  mongoose : mongoose
};
