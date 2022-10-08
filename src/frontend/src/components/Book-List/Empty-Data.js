import emptydataillustration from '../../assets/images/empty-data-illustration.jpg';

export default function EmptyData() {
	return (
		<img
			src={emptydataillustration}
			width={500}
			className="img-fluid mx-auto d-block"
			style={{ borderRadius: '400px' }}
		/>
	);
}
