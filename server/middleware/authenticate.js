var {User} = require('./../models/user');

//create a middleware to make the routes privates
//middleware use 3 arguments
var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  //verify token fetch user
  //create model method  findByToken
  User.findByToken(token).then((user) => {
      if (!user) {
        return Promise.reject();
      }

      req.user = user;
      req.token = token;
      next();
  }).catch((e) => {         //this code is executed when findByToken return a Promise.reject()
     res.status(401).send();
  });
};

module.exports = {authenticate};
