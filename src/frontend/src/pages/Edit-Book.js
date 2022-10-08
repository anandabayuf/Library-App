import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBook, editBook, getBookById } from '../api/Books';
import Loader from '../components/Loader';
import MessageToast from '../components/Message-Toast';
import { backgroundColor } from '../utils/Color';

export default function EditBook() {
	const [book, setBook] = useState({
		title: '',
		author: '',
		status: 'Available',
		checkOutBy: '',
	});

	const [isLoading, setIsLoading] = useState(false);

	const [toastState, setToastState] = useState({
		show: false,
		message: '',
		title: '',
	});

	const navigate = useNavigate();
	const params = useParams();

	const getBookData = async () => {
		if (params) {
			const response = await getBookById(params.id);
			const data = await response.data;

			setBook({
				title: data.title,
				author: data.author,
				status: data.status,
				checkOutBy: data.checkOutBy || '',
			});
		}
	};

	useEffect(() => {
		getBookData();
	}, []);

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;

		setBook({
			...book,
			[key]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);
		if (book.status === 'Available') {
			setBook({
				...book,
				checkOutBy: '',
			});
		}
		const response = await editBook(params.id, book);

		setTimeout(() => {
			setIsLoading(false);
			if (response.status.includes('201')) {
				//this means success to edit
				navigate('/book', {
					state: {
						toastState: {
							show: true,
							message: response.message,
							title: 'SUCCESS',
						},
					},
				});
			} else {
				setToastState({
					show: true,
					message: response.message,
					title: 'ERROR',
				});

				setTimeout(() => {
					setToastState({
						show: false,
						message: '',
						title: '',
					});
				}, 5000);
			}
		}, 1000);
	};

	const handleCancel = () => {
		navigate('/book');
	};

	const style = {
		page: {
			padding: '20px',
			backgroundColor: backgroundColor,
		},
		button: {
			borderRadius: '15px',
		},
		input: {
			borderRadius: '15px',
		},
		card: {
			padding: '20px',
			borderRadius: '20px',
			backgroundColor: backgroundColor,
			border: 'none',
		},
	};

	return (
		<div
			className="min-vh-100"
			style={style.page}
		>
			<div className="container">
				<h3 className="mb-5">Edit Book</h3>
				<div
					className="card shadow"
					style={style.card}
				>
					<div className="card-body">
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label
									htmlFor="title"
									className="form-label"
								>
									Title
								</label>
								<input
									type="text"
									className="form-control"
									id="title"
									name="title"
									value={book.title}
									onChange={handleChange}
									style={style.input}
								/>
							</div>
							<div className="mb-3">
								<label
									htmlFor="author"
									className="form-label"
								>
									Author
								</label>
								<input
									type="text"
									className="form-control"
									id="author"
									name="author"
									value={book.author}
									onChange={handleChange}
									style={style.input}
								/>
							</div>
							<div className="mb-3">
								<label
									htmlFor="status"
									className="form-label"
								>
									Status
								</label>
								<select
									className="form-select"
									id="status"
									name="status"
									value={book.status}
									onChange={handleChange}
									style={style.input}
								>
									<option value="Available">Available</option>
									<option value="Not Available">
										Not Available
									</option>
								</select>
							</div>
							<div className="mb-3">
								<label
									htmlFor="checkOutBy"
									className="form-label"
								>
									Check Out By
								</label>
								<input
									type="text"
									className="form-control"
									id="checkOutBy"
									name="checkOutBy"
									value={book.checkOutBy}
									onChange={handleChange}
									disabled={book.status === 'Available'}
									style={style.input}
								/>
							</div>
							{isLoading ? (
								<Loader />
							) : (
								<div className="row mt-5">
									<div className="col">
										<div className="d-grid gap-2">
											<button
												type="button"
												className="btn btn-outline-dark"
												onClick={() => handleCancel()}
												style={style.button}
											>
												Cancel
											</button>
										</div>
									</div>
									<div className="col">
										<div className="d-grid gap-2">
											<button
												type="submit"
												className="btn btn-outline-success"
												disabled={
													book.author === '' ||
													book.status === '' ||
													book.title === '' ||
													(book.status ===
														'Not Available' &&
														book.checkOutBy === '')
												}
												style={style.button}
											>
												Edit
											</button>
										</div>
									</div>
								</div>
							)}
						</form>
					</div>
				</div>
			</div>
			<MessageToast
				toastState={toastState}
				setToastState={setToastState}
			/>
		</div>
	);
}
