const schema = require('./schema');

exports.create = (data) => {
	return new Promise((resolve, reject) => {
		new schema.BookSchema(data).save((err, response) => {
			if (err) {
				reject(err);
			} else {
				resolve(response);
			}
		});
	});
};

exports.getAll = (query) => {
	let { limit, ...search } = query;
	const key = Object.keys(search);
	const value = search[key];

	return new Promise((resolve, reject) => {
		schema.BookSchema.find(
			{ [key]: { $regex: `^${value}`, $options: 'i' } },
			(err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			}
		);
	});
};

exports.getById = (id) => {
	return new Promise((resolve, reject) => {
		schema.BookSchema.findById(id, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
};

exports.edit = (id, data) => {
	return new Promise((resolve, reject) => {
		schema.BookSchema.findByIdAndUpdate(id, data, (err, result) => {
			if (err) {
				reject(err);
			} else {
				this.getById(id)
					.then((res) => resolve(res))
					.catch((e) => reject(e));
			}
		});
	});
};

exports.editBookStatus = (id, payload) => {
	return new Promise((resolve, reject) => {
		this.getById(id)
			.then((findByIdRes) => {
				let data = {};

				if (findByIdRes.status == 'Not Available') {
					data = {
						status: 'Available',
						checkOutBy: '',
					};
				} else {
					data = {
						status: 'Not Available',
						checkOutBy: payload.checkOutBy,
					};
				}

				this.edit(id, data)
					.then((result) => {
						resolve(result);
					})
					.catch((err) => reject(err));
			})
			.catch((findByIdErr) => reject(findByIdErr));
	});
};

exports.delete = (id) => {
	return new Promise((resolve, reject) => {
		schema.BookSchema.findByIdAndDelete(id, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
};
