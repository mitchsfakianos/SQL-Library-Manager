var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

// getting new book form
router.get('/books/new', (req, res, next) => {
	res.render('new-book', { book: Book.build()});
});

// posting input of new book form, catching errors like no author or title
router.post('/books/new', (req, res) => {
	var newBook = Book.create(req.body)
		.then( function() {res.redirect('/')})
		.catch( function(err) {
			res.render('new-book', {book: newBook, errors: err.errors})		
		})
});

// getting each book by id, if id book is not present, not found is shown
router.get('/books/:id', (req, res, next) => {
	Book.findByPk(req.params.id)
		.then( function(book) {
			if(book) {
				res.render('update-book', {book: book, title: book.title})
			} else {
				res.render('page-not-found');
			}
		})
});

// updating book and catching errors
router.post('/books/:id', (req, res) => {
	Book.findByPk(req.params.id)
		.then( function(book) {return book.update(req.body);})
		.then( function(book) {
			if(book){
				res.redirect('/');
			} else {
				res.render('page-not-found');
			}})
		.catch( function(err) {
			res.render('update-book', {book: book, errors: err.errors})		
		})
});

// deleting book
router.post('/books/:id/delete', (req, res) => {
	Book.findByPk(req.params.id)
		.then( function(book) {return book.destroy();})
		.then( function() {res.redirect('/books')})
});

router.get('/books', (req, res) => {
	Book.findAll().then( function(books) {
		var list = { books: books };
		res.render('index', list);
	});
});

module.exports = router;