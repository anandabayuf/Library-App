const { config } = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const controllers = require('./controllers');

config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

controllers(app);

app.listen(process.env.PORT, () => {
	console.log(
		`Library App API listening on http://localhost:${process.env.PORT}`
	);
});
