import { useEffect, useState } from 'react';
import { PlusCircle } from 'react-bootstrap-icons';
import { backgroundColor } from '../utils/Color';
import { deleteBook, getAllBooks, returnBook } from '../api/Books';
import BookTable from '../components/Book-List/Book-Table';
import Loader from '../components/Loader';
import EmptyData from '../components/Book-List/Empty-Data';
import SearchBook from '../components/Book-List/Search-Book';
import MessageToast from '../components/Message-Toast';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BookList() {
	const [books, setBooks] = useState([]);
	const [booksList, setBooksList] = useState([]);

	const [query, setQuery] = useState('');

	const [isFetching, setIsFetching] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(null);

	const [toastState, setToastState] = useState({
		show: false,
		message: '',
		title: '',
	});

	const location = useLocation();
	const navigate = useNavigate();

	const getBooks = async () => {
		setIsFetching(true);
		const response = await getAllBooks();
		const data = await response.data;

		setTimeout(() => {
			setBooks(data);
			setBooksList(data);
			setIsFetching(false);
		}, 1000);
	};

	useEffect(() => {
		getBooks();
	}, []);

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;

		if (key === 'query') {
			setQuery(value);
			if (value === '') {
				setBooksList(books);
			} else {
				setBooksList((curVal) =>
					curVal.filter((el) =>
						el.title.toLowerCase().includes(value.toLowerCase())
					)
				);
			}
		}
	};

	const handleReturn = async (id, index) => {
		setCurrentIndex(index);
		setIsLoading(true);
		const response = await returnBook(id);

		setTimeout(() => {
			setIsLoading(false);
			if (response.status.includes('201')) {
				//this means success to edit
				getBooks();

				setToastState({
					show: true,
					message: response.message,
					title: 'SUCCESS',
				});
			} else {
				setToastState({
					show: true,
					message: response.message,
					title: 'ERROR',
				});
			}

			setTimeout(() => {
				setToastState({
					show: false,
					message: ``,
					title: '',
				});
			}, 5000);
		}, 1000);
	};

	const handleClickCreate = () => {
		navigate('create');
	};

	const handleAfterCreateUpdateCheckout = () => {
		if (location.state) {
			setToastState(location.state.toastState);
			window.history.replaceState({}, document.title);
			setTimeout(() => {
				setToastState({
					show: false,
					message: ``,
					title: '',
				});
			}, 5000);
		}
	};

	const handleClickEdit = (id) => {
		navigate(`edit/${id}`);
	};

	const handleClickCheckout = (id) => {
		navigate(`checkout/${id}`);
	};

	useEffect(() => {
		handleAfterCreateUpdateCheckout();
	}, []);

	const handleDelete = async (id, index) => {
		setCurrentIndex(index);
		setIsLoading(true);
		const response = await deleteBook(id);

		setTimeout(() => {
			setIsLoading(false);
			if (response.status.includes('204')) {
				//this means success to delete
				getBooks();

				setToastState({
					show: true,
					message: response.message,
					title: 'SUCCESS',
				});
			} else {
				setToastState({
					show: true,
					message: response.message,
					title: 'ERROR',
				});
			}

			setTimeout(() => {
				setToastState({
					show: false,
					message: ``,
					title: '',
				});
			}, 5000);
		}, 1000);
	};

	const style = {
		page: {
			padding: '20px',
			backgroundColor: backgroundColor,
		},
		button: {
			borderRadius: '15px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			margin: '0px',
		},
		icon: {
			verticalAlign: 'middle',
		},
	};

	return (
		<div
			className="min-vh-100"
			style={style.page}
		>
			<div className="container-md">
				<div className="row justify-content-between mb-4">
					<div className="col-auto">
						<h3>Book List</h3>
					</div>
					<div className="col-auto">
						<div className="row">
							<div className="col-auto">
								<SearchBook
									query={query}
									handleChangeQuerySearch={handleChange}
								/>
							</div>
							<div className="col-auto">
								<button
									className="btn btn-outline-primary shadow"
									style={style.button}
									onClick={() => handleClickCreate()}
								>
									<PlusCircle size={16} />
									&nbsp;Create Book
								</button>
							</div>
						</div>
					</div>
				</div>

				{isFetching ? (
					<Loader />
				) : booksList.length !== 0 ? (
					<BookTable
						books={booksList}
						handleReturn={handleReturn}
						isLoading={isLoading}
						currentIndex={currentIndex}
						handleDelete={handleDelete}
						handleEdit={handleClickEdit}
						handleCheckout={handleClickCheckout}
					/>
				) : (
					<EmptyData />
				)}
			</div>
			<MessageToast
				toastState={toastState}
				setToastState={setToastState}
			/>
		</div>
	);
}
