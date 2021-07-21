const express = require('express');
const app = express();
const sequelize = require('./models').sequelize;
const bookRoute = require('./routes/index.js');
const bodyParser = require('body-parser');

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

sequelize.sync().then(function() {
	app.listen(3000, () => { console.log('\nApp is listening on port 3000') });
});

app.use(bookRoute);
