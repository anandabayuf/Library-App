import { BASE_URL } from './Helper';

const getAllBooks = async () => {
	try {
		const response = await fetch(BASE_URL);
		const responseJson = await response.json();

		return responseJson;
	} catch (err) {
		alert(err);
	}
};

const searchBooks = async ({ key, value }) => {
	try {
		const response = await fetch(`${BASE_URL}?${key}=${value}`);
		const responseJson = await response.json();

		return responseJson;
	} catch (err) {
		alert(err);
	}
};

const getBookById = async (id) => {
	try {
		const response = await fetch(`${BASE_URL}/${id}`);
		const responseJson = await response.json();

		return responseJson;
	} catch (err) {
		alert(err);
	}
};

const createBook = async (data) => {
	try {
		const response = await fetch(BASE_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		const responseJson = await response.json();

		return responseJson;
	} catch (err) {
		alert(err);
	}
};

const editBook = async (id, data) => {
	try {
		const response = await fetch(`${BASE_URL}/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		const responseJson = await response.json();

		return responseJson;
	} catch (err) {
		alert(err);
	}
};

const checkOutBook = async (id, data) => {
	try {
		const response = await fetch(`${BASE_URL}/checkout/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		const responseJson = await response.json();

		return responseJson;
	} catch (err) {
		alert(err);
	}
};

const returnBook = async (id) => {
	try {
		const response = await fetch(`${BASE_URL}/return/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const responseJson = await response.json();

		return responseJson;
	} catch (err) {
		alert(err);
	}
};

const deleteBook = async (id) => {
	try {
		const response = await fetch(`${BASE_URL}/${id}`, {
			method: 'DELETE',
		});
		const responseJson = await response.json();

		return responseJson;
	} catch (err) {
		alert(err);
	}
};

export {
	getAllBooks,
	getBookById,
	createBook,
	editBook,
	checkOutBook,
	returnBook,
	deleteBook,
	searchBooks,
};
