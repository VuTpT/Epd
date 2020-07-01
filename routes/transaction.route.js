var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const shortid = require('shortid');
var db = require('../db');

//Display screen transactions
router.get('/view', function(request, response) {
  var users = db.get('users').value();
  var books = db.get('books').value();
  var transactions = db.get('transactions').value();
  
  var data = [];
  transactions.map(function(value, index){
    data[index]['transactionsID'] = value.transactionID;
    data[index]['books'] =  db.get('books').find({ bookid : value.bookId }).value().title;
    data[index]['users'] =  db.get('users').find({ userid : value.userId }).value().name;
  })
  
  console.log(data);
  
  response.render('transactions/index', {
    transactions : data,
    books : books,
    users : users
  });
});

//Create transactions  
router.post('/create', function(request, response) {
  db.get('transactions')
    .push({ transactionId : shortid.generate(), userid : request.body.userid, bookid: request.body.bookid })
    .write()
  
  response.redirect('/transaction/view');
})

module.exports = router;