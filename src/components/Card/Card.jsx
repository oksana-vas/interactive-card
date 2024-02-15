import {
	initialName,
	initialNumber,
	initialMMYY,
	initialCvc,
} from '../../constants/constants';
import './Card.scss';

export const Card = ({ formattedNumber, card }) => {
  const {
    name, 
    month, 
    year, 
    cvc
  } = card;

  return (
    <section className="Card">
      <div className="Card__front">
        <span className="Card__logo"></span>
        <span className="Card__number">{formattedNumber || initialNumber}</span>
        <span className="Card__name">{name || initialName}</span>
        <span className="Card__date">{month || initialMMYY}/{year || initialMMYY}</span>
      </div>
      <div className="Card__back">
        <span className="Card__cvc">{cvc || initialCvc}</span>
      </div>
    </section>
  );
};
