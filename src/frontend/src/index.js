import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import BookList from './pages/Book-List';
import CreateBook from './pages/Create-Book';
import EditBook from './pages/Edit-Book';
import CheckoutBook from './pages/Checkout-Book';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Routes>
			<Route
				path="/book"
				element={<App />}
			>
				<Route
					index
					element={<BookList />}
				/>
				<Route
					path="create"
					element={<CreateBook />}
				/>
				<Route
					path="edit/:id"
					element={<EditBook />}
				/>
				<Route
					path="checkout/:id"
					element={<CheckoutBook />}
				/>
			</Route>
			<Route
				path="*"
				element={<Navigate to="/book" />}
			/>
		</Routes>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
