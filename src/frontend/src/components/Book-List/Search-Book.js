export default function SearchBook({ query, handleChangeQuerySearch }) {
	return (
		<input
			type="text"
			className="form-control"
			name="query"
			value={query}
			onChange={handleChangeQuerySearch}
			placeholder="Search book title"
		/>
	);
}
