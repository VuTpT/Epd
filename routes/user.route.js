var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const shortid = require('shortid');
var db = require('../db');

//Display screen users
router.get('/login', function(request, response) {
  response.render('user/index', {
    users : db.get('users').value()
  });
});

//Search users
router.get('/users/search', function (request, response) {
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
});

//Create users
router.get('/users/create', function(request, response) {
  response.render('user/create');
});

//Edit users
router.get('/users/update/:id', function(request, response) {
  response.render('user/update');
});

//Delete users
router.get('/users/delete/:id', function(request, response) {
  var id = request.params.id;
  
  var book = db
  .get('users')
  .remove({ id : id })
  .write();
  
  response.redirect('/route/login');
});

// METHOD POST

//Edit users
router.post('/users/update/:id', function(request, response) {

  db.get('users')
    .find({ id : request.params.id })
    .assign({ name: request.body.name })
    .write()
  
  response.redirect('/route/login');
});

//Create user  
router.post('/users/create', function(request, response) {
  db.get('users')
    .push({ id: shortid.generate(), name: request.body.name })
    .value()
    .id;
  response.redirect('/route/login');
})

module.exports = router;