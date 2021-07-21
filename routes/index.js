var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

router.get('/books', (req, res) => {
	(async () => {
	  const allBooks = await Book.findAll();

	  try {
	    return res.json(allBooks);
	  } catch (error) {
	    console.error('Error connecting to the database: ', error);
	  }
	})();
});

module.exports = router;