var db = require('../db');
const bodyParser = require('body-parser');
const shortid = require('shortid');

module.exports.view = function(request, response) {
  var users = db.get('users').value();
  var books = db.get('books').value();
  var transactions = db.get('transactions').value();
  
  var data = [];
  transactions.map(function (value, index){
    data[index] = {};
    data[index]['transactionId'] = value.transactionId;
    data[index]['user'] = db
      .get('users')
      .find({ userId: JSON.stringify(value.userId) })
      .value()
      .;
    data[index]['book'] = db
      .get('books')
      .find({ bookId: JSON.stringify(value.bookId) })
      .value()
      .title;
  });
  console.log(data);
  
  response.render('transactions/index', {
    transactions : data,
    books : books,
    users : users
  });
};

module.exports.search = function (request, response) {
  var q = request.query.q
  var matchedUserId = db
    .get('transactions')
    .value()
    .filter(function(value) {
      return q ? value.transactionId.toLowerCase().indexOf(q.toLowerCase()) !== -1 : true;
    });
    response.render('transactions/search', {
      transactions : matchedUserId,
      bookId : matchedUserId,
      userId : matchedUserId
  });
};

// METHOD POST

module.exports.postCreate = function(request, response) {
  db.get('transactions')
    .push({ transactionId : shortid.generate(), userId : request.body.user, bookId: request.body.book })
    .write();
  
  response.redirect('/transaction/view');
};


