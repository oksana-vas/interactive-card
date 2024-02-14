import './Card.scss';

export const Card = ({
	formattedCardNumber,
	name,
	month,
	year,
	cvc,
}) => {
	return (
		<section className="Card">
			<div className="Card__front">
				<span className="Card__logo"></span>
				<span className="Card__number">{formattedCardNumber || '0000 0000 0000 0000'}</span>
				<span className="Card__name">{name || 'Jane Appleseed'}</span>
				<span className="Card__date">{month || '00'}/{year || '00'}</span>
			</div>
			<div className="Card__back">
				<span className="Card__cvc">{cvc || '000'}</span>
			</div>
		</section>
	);
};