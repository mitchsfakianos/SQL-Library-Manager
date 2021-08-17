const express = require('express');
const app = express();
const sequelize = require('./models').sequelize;
const bookRoute = require('./routes/index.js');
const bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

sequelize.sync().then(function() {
	app.listen(3000, () => { console.log('\nApp is listening on port 3000') });
});

app.use(bookRoute);

app.get('/', (req, res) => {
  res.redirect('/books');
});

app.use((req, res) => { // 404 handler
	res.render('page-not-found');
});

app.use(function (err, req, res, next){   // general error handler
	res.status(err.status || 500);
	err.message = "Something went wrong!"
	console.log(err.status, err.message);
	res.render('error');
});