const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ =require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
    password: {
      type: String,
      require: true,
      minlength: 6
    },
    tokens: [{
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }]
});

//we OVERRIDE this method
//method to return what exactly get back when a mongoose model is  converted  to a JSON value
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

//instance method  have access to individual documents,  necesary to create a json web token
// here do not use arrow function because  do not bind  THIS keyword.   THIS keyword stores individual documents
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
      decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // });
        return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,   //to query a nested document we wrap the values in qutoes
    'tokens.access': 'auth'
  });
};


UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({email}).then((user)  => {
    if (!user) {
      return Promise.reject();
    }

    return new  Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

//this middleware run a code before a given event,  in this case the event 'save'
UserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
     //generate a salt
     bcrypt.genSalt(10, (err, salt) => {
       bcrypt.hash(user.password, salt, (err, hash) => {
         //overrid the plain text password
         user.password = hash;
         next();
       });
     });
  } else {
    next();
  }
});

var User = mongoose.model('User', UserSchema );

module.exports = {User};
