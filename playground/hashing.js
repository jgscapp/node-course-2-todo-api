
const {SHA256} = require('crypto-js');  //to use crypto install  npm i crypto-js --save
const jwt = require('jsonwebtoken');  //to use this  install npm i jsonwebtoken --save
const bcrypt = require('bcryptjs');   // npm i bcryptjs --save

// //test jwt
// var data = {
//   id: 10
// };
//
// var token = jwt.sign(data, '123abc');    //use https://jwt.io   to verify your token
// console.log(token);
//
// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);

//bcryptjs test
var password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

var hashedPassword = 'sfkjfofwquajsfa;af';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});



//the code above replace all this code, it does  the same validation, create a token and verify it
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//   id: 4
// };
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
//  // is a user client try to change the token, it won't work because of the salt "somesecret" added at the server side
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Do not trust!');
// }
