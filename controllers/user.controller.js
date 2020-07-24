var db = require('../db');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const bcrypt = require('bcrypt');


module.exports.login = function(request, response) {
  response.render('user/index', {
    users : db.get('users').value()
  });
};

module.exports.search = function (request, response) {
  var q = request.query.q
  var matchedTitle = db
    .get('users')
    .value()
    .filter(function(value) {
      return q ? value.name.toLowerCase().indexOf(q.toLowerCase()) !== -1 : true;
    });
    response.render('user/index', {
      users: matchedTitle
  });
};

module.exports.create = function(request, response) {
  response.render('user/create');
};

module.exports.update = function(request, response) {
  response.render('user/update');
};

module.exports.delete = function(request, response) {
  var userId = request.params.userId;
  
  var book = db
  .get('users')
  .remove({ userId : userId })
  .write();
  
  response.redirect('/users/login');
};

// METHOD POST

module.exports.postUpdate = function(request, response) {

  db.get('users')
    .find({ userId : request.params.userId })
    .assign({ name: request.body.name })
    .write()
  
  response.redirect('/users/login');
};

module.exports.postCreate = async function(request, response) {
     const salt = await bcrypt.genSalt(10);
     const hashPass = await bcrypt.hash(request.body.password, salt)
     
   let newUser = {
    id: shortid.generate(),
    password : hashPass,
    email: request.body.email,
    name: request.body.name,
    isAdmin: false
  }
   
   db.get("users").push(newUser).write();
  
  response.redirect('/users')
  
  }


