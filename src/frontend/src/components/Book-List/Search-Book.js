import Loader from '../Loader';

export default function SearchBook({
	searchState,
	handleChangeSearch,
	handleSubmitSearch,
	handleClearSearch,
}) {
	return (
		<form onSubmit={handleSubmitSearch}>
			<div className="row align-items-center justify-content-center">
				<div className="col-auto">
					<label className="form-label">Search By: </label>
				</div>
				<div className="col-auto">
					<select
						className="form-select"
						name="category"
						value={searchState.category || ''}
						onChange={handleChangeSearch}
					>
						<option value="title">Title</option>
						<option value="author">Author</option>
						<option value="status">Status</option>
						<option value="checkOutBy">Checkout By</option>
					</select>
				</div>
				<div className="col-6">
					<input
						type="text"
						className="form-control"
						name="query"
						value={searchState.query}
						onChange={handleChangeSearch}
						placeholder="Search..."
					/>
				</div>
				{searchState.isLoading ? (
					<div className="col-auto">
						<Loader />
					</div>
				) : (
					<>
						<div className="col-auto">
							<button
								className="btn btn-outline-dark"
								type="submit"
								disabled={searchState.query === ''}
							>
								Search
							</button>
						</div>
						<div className="col-auto">
							<button
								className="btn btn-link"
								type="button"
								disabled={searchState.query === ''}
								onClick={() => handleClearSearch()}
							>
								Clear Search
							</button>
						</div>
					</>
				)}
			</div>
		</form>
	);
}
