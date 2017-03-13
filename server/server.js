require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');   //get JSON and convert to object
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;   //PORT  is set if is running in HEROKU

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos});   //better to send an object instead of an array
  }, (e) => {
    res.status(400).send(e);
  });
});

//get with parameter
app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
   }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
       if (!todo) {
          return res.status(404).send();
       }

       res.send({todo});   //respond with an object
     }).catch( (e) => {
       res.status(400).send();
     });
  });


app.delete('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
   }

  //  Todo.findByIdAndRemove(id).then((todo) => {
    Todo.findOneAndRemove({
      _id: id,
      _creator: req.user._id
    }).then((todo) => {
     if (!todo) {
        return res.status(404).send();
     }

     res.send({todo});   //respond with an object
   }).catch( (e) => {
     res.status(400).send();
   });

});

//patch is used to update
app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);   //is a subset of all the things that user pass to update

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
   }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();  //javascript timestamp
  } else {
    body.completed = false;
    body.completedAt = null;
  }

//  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)  => {
  Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((todo)  => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});


//POST users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
    //res.send(user);
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});


app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});


app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  //verify email exist
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});


app.delete('/users/me/token', authenticate, (req,res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});


module.exports = {app};
