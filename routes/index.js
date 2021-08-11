var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

router.get('/books/new', (req, res, next) => {
	res.render('new-book', { book: Book.build(), title: 'New Book'});
});

router.post('/books/new', (req, res) => {

});

router.get('/books/:id', (req, res, next) => {

});

router.post('/books/:id', (req, res) => {

});

router.post('/books/:id/delete', (req, res) => {

});

router.get('/books', (req, res) => {
	Book.findAll().then( function(books) {
		var list = { books: books };
		res.render('index', list);
	});
});

module.exports = router;