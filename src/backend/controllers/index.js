const bookController = require('./book');

module.exports = (app) => {
	app.use('/book', bookController);
};
