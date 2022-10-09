const express = require('express');
const router = express.Router();

const BookModel = require('../models/book');

router.get('', async (req, res) => {
	// console.log(req.query)
	try {
		res.status(200).json({
			message: 'Successfully get all books data',
			status: '200 OK',
			data: await BookModel.getAll(req.query),
		});
	} catch (err) {
		res.status(404).json({
			message: 'Error to get all books data',
			status: '404 NOT FOUND',
			err,
		});
	}
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;

	try {
		res.status(200).json({
			message: 'Successfully get book data',
			status: '200 OK',
			data: await BookModel.getById(id),
		});
	} catch (err) {
		res.status(404).json({
			message: 'Error to get book data',
			status: '404 NOT FOUND',
			err,
		});
	}
});

router.post('', async (req, res) => {
	const payload = req.body;

	try {
		res.status(201).json({
			message: 'Successfully create book data',
			status: '201 OK',
			data: await BookModel.create(payload),
		});
	} catch (err) {
		res.status(404).json({
			message: 'Error to create book data',
			status: '404 NOT FOUND',
			err,
		});
	}
});

router.put('/:id', async (req, res) => {
	const id = req.params.id;
	const payload = req.body;

	try {
		res.status(201).json({
			message: 'Successfully update book data',
			status: '201 OK',
			data: await BookModel.edit(id, payload),
		});
	} catch (err) {
		res.status(404).json({
			message: 'Error to update book data',
			status: '404 NOT FOUND',
			err,
		});
	}
});

router.put('/checkout/:id', async (req, res) => {
	const id = req.params.id;
	const payload = req.body;

	try {
		res.status(201).json({
			message: 'Successfully checkout book',
			status: '201 OK',
			data: await BookModel.editBookStatus(id, payload),
		});
	} catch (err) {
		res.status(404).json({
			message: 'Error to update book status data',
			status: '404 NOT FOUND',
			err,
		});
	}
});

router.put('/return/:id', async (req, res) => {
	const id = req.params.id;

	try {
		res.status(201).json({
			message: 'Successfully return book',
			status: '201 OK',
			data: await BookModel.editBookStatus(id),
		});
	} catch (err) {
		res.status(404).json({
			message: 'Error to update book status data',
			status: '404 NOT FOUND',
			err,
		});
	}
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;

	try {
		res.status(200).json({
			message: 'Successfully delete book data',
			status: '204 OK',
			data: await BookModel.delete(id),
		});
	} catch (err) {
		res.status(404).json({
			message: 'Error to delete book data',
			status: '404 NOT FOUND',
			err,
		});
	}
});

module.exports = router;
