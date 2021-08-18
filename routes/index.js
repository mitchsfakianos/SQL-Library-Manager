var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

function asyncHandler(cb) {
    return async(req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (error) {
            next(error);
        };
    };
};

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
router.get('/books/:id', asyncHandler(async(req, res, next) => {
	const book = await Book.findByPk(req.params.id)
		
	await res.render('update-book', {book: book, title: book.title})
}));

// updating book and catching errors
router.post('/books/:id', (req, res) => {
	Book.findByPk(req.params.id)
		.then( function(book) {return book.update(req.body);})
		.then( function(book) {res.redirect('/');})
		.catch( function(err) {
			var book = Book.build(req.body);
			book.id = req.params.id;
			res.render('update-book', {book: book, errors: err.errors})		
		})
});

// deleting book
router.post('/books/:id/delete', asyncHandler(async(req, res) => {
	const book = await Book.findByPk(req.params.id);

	await book.destroy();
	res.redirect('/');
}));

router.get('/books', (req, res) => {
	Book.findAll().then( function(books) {
		res.render('index', { books: books });
	});
});

module.exports = router;