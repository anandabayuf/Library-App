import Badge from 'react-bootstrap/Badge';
import { Trash, Pencil } from 'react-bootstrap-icons';
import Loader from '../Loader';

export default function BookTable({
	books,
	handleEdit,
	handleDelete,
	handleCheckout,
	handleReturn,
	isLoading,
	currentIndex,
}) {
	const style = {
		button: {
			borderRadius: '50px',
		},
	};

	return (
		<table className="table">
			<thead>
				<tr className="text-center">
					<th scope="col">#</th>
					<th scope="col">Title</th>
					<th scope="col">Author</th>
					<th scope="col">Status</th>
					<th scope="col">Check Out By</th>
					<th scope="col">Action</th>
				</tr>
			</thead>
			<tbody>
				{books.map((el, index) => {
					return (
						<tr
							key={index}
							className="text-center"
						>
							<td scope="row">{index + 1}</td>
							<td>{el.title}</td>
							<td>{el.author}</td>
							<td>
								{el.status === 'Available' ? (
									<Badge
										className="shadow"
										bg="success"
									>
										{el.status}
									</Badge>
								) : (
									<Badge
										className="shadow"
										bg="secondary"
									>
										{el.status}
									</Badge>
								)}
							</td>
							<td>{el.checkOutBy || '-'}</td>
							<td>
								{isLoading && currentIndex === index ? (
									<Loader />
								) : (
									<div className="row justify-content-center">
										<div className="col-auto">
											{el.status == 'Available' ? (
												<button
													className="btn btn-outline-warning shadow"
													style={style.button}
													onClick={() =>
														handleCheckout(el._id)
													}
												>
													Checkout
												</button>
											) : (
												<button
													className="btn btn-outline-info shadow"
													style={style.button}
													onClick={() =>
														handleReturn(
															el._id,
															index
														)
													}
												>
													Return
												</button>
											)}
										</div>
										{el.status === 'Available' && (
											<>
												<div className="col-auto">
													<button
														className="btn btn-outline-dark shadow"
														style={style.button}
														onClick={() =>
															handleEdit(el._id)
														}
													>
														<Pencil size={16} />
													</button>
												</div>
												<div className="col-auto">
													<button
														className="btn btn-outline-danger shadow"
														style={style.button}
														onClick={() =>
															handleDelete(
																el._id,
																index
															)
														}
													>
														<Trash size={16} />
													</button>
												</div>
											</>
										)}
									</div>
								)}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
