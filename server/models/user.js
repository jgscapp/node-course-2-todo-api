var mongoose = require('mongoose');

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

module.exports = {User};
