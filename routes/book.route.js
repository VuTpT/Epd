var express = require('express');
var router = express.Router();
var bookController = require("../controllers/book.controller");
var validate = require("../validate/book.validate");

//Display screen books
router.get('/', bookController.show);

//Cookies
router.get('/cookies', function (request, response, next) {
  response.cookie('cookies', function count(){
    var count = 1;
    count ++;
    console.log(count);
  });

});

//Search books
router.get('/search', bookController.search);

//Create books
router.get('/create', bookController.create);

//Update books
router.get('/update/:bookId', bookController.update);

//Delete books
router.get('/delete/:bookId', bookController.delete);

// METHOD POST

//Update books
router.post('/update/:bookId', bookController.postUpdate);

//Create books  
router.post('/create', validate.postCreate, bookController.postCreate)

module.exports = router;