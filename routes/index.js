var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

router.get('/books', (req, res) => {
	Book.findAll().then( function(books) {
		var list = { books: books };
		res.render('index', list);
	});
});

module.exports = router;