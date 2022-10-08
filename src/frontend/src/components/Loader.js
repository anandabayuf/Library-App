import { textSecondary } from '../utils/Color';

export default function Loader() {
	return (
		<div className="text-center">
			<div
				className="spinner-border"
				role="status"
				style={{ color: textSecondary }}
			>
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	);
}
