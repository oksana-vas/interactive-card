import { useState } from 'react';
import { Card } from './components/Card/Card';
import { Success } from './components/Success/Success';
import { Form } from './components/Form/Form';
import './App.scss';

export const App = () => {
	const [cvc, setCvc] = useState('');
	const [cardNumber, setCardNumber] = useState('');
	const [name, setName] = useState('');
	const [month, setMonth] = useState('');
	const [year, setYear] = useState('');

	const [hasEmptyName, setHasEmptyName] = useState(false);
	const [hasEmptyCardNumber, setHasEmptyCardNumber] = useState(false);
	const [hasEmptyMonth, setHasEmptyMonth] = useState(false);
	const [hasEmptyYear, setHasEmptyYear] = useState(false);
	const [hasEmptyCvc, setHasEmptyCvc] = useState(false);

	const [hasInvalidCardNumber, setHasInvalidCardNumber] = useState(false);
	const [hasInvalidMonth, setHasInvalidMonth] = useState(false);
	const [hasInvalidYear, setHasInvalidYear] = useState(false);
	const [hasInvalidCvc, setHasInvalidCvc] = useState(false);

	const [formattedCardNumber, setFormattedCardNumber] = useState('');
	const [isFormSubmitted, setIsFormSubmitted] = useState(false); 

	const MIN_MONTH = 1;
	const MAX_MONTH = 12;
	const MIN_CARD_LENGTH = 13;

	const emptyInputMessage = 'Can\'t be blank';
	const wrongFormatMessage = 'Wrong format, valid numbers only';

	const numberRegex = /^\d+$/;

	const isInputValid = (inputValue, inputType) => {
		switch (inputType) {
			case 'number': {
				return numberRegex.test(inputValue) && inputValue.length >= MIN_CARD_LENGTH;
			}
			case 'month': {
				return numberRegex.test(inputValue) && ((+inputValue >= MIN_MONTH) && (+inputValue <= MAX_MONTH));
			}

			case 'year': {
				const currentYear = new Date().getFullYear() % 100;

				return numberRegex.test(inputValue) && +inputValue >= currentYear;
			}

			case 'cvc': {
				return numberRegex.test(inputValue) && inputValue.length === 3;
			}
		}
	};

	const getFormattedCardNumber = (numbers) => {
		const arrayNumber = numbers.replace(/\s/g, "");
  	const chunkSize = 4;

		const newNumbers = splitNumbers(arrayNumber, chunkSize);

		setFormattedCardNumber(newNumbers.join(' '));
	};

	const splitNumbers = (currentArray, chunkSize) => {
			return Array.from({ length: Math.ceil(currentArray.length / chunkSize) }, (_, index) =>
			currentArray.slice(index * chunkSize, index * chunkSize + chunkSize)
		);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const formattedName = name.trim();
		const formattedNumber = cardNumber.trim();
		const formattedMonth = month.trim();
		const formattedYear = year.trim();
		const formattedCvc = cvc.trim();

		setHasEmptyName(!formattedName);
		setHasEmptyCardNumber(!formattedNumber);
		setHasEmptyMonth(!formattedMonth);
		setHasEmptyYear(!formattedYear);
		setHasEmptyCvc(!formattedCvc);

		const hasEmptyInput = !formattedName 
												|| !formattedNumber 
												|| !formattedMonth 
												|| !formattedYear 
												|| !formattedCvc;

		if (hasEmptyInput) {
			return;
		}

		const isCardNumberValid = isInputValid(formattedNumber, 'number');
		const isMonthValid = isInputValid(formattedMonth, 'month');
		const isYearValid = isInputValid(formattedYear, 'year');
		const isCvcValid = isInputValid(formattedCvc, 'cvc');

		setHasInvalidCardNumber(!isCardNumberValid);
		setHasInvalidMonth(!isMonthValid);
		setHasInvalidYear(!isYearValid);
		setHasInvalidCvc(!isCvcValid);

		const hasInvalidInput = !isCardNumberValid 
													|| !isMonthValid 
													|| !isYearValid
													|| !isCvcValid;

		if (hasInvalidInput) {
			return;
		}

		setIsFormSubmitted(true);
	};
	
	const handleInputChange = (event, value) => {
		switch (value) {
			case 'name': {
				setHasEmptyName(false);
				setName(event.target.value);
				break;
			}

			case 'number': {
				setHasEmptyCardNumber(false);
				setHasInvalidCardNumber(false);
				setCardNumber(event.target.value);

				getFormattedCardNumber(event.target.value);
				break;
			}

			case 'month': {
				setHasEmptyMonth(false);
				setHasInvalidMonth(false);
				setMonth(event.target.value);
				break;
			}

			case 'year': {
				setHasEmptyYear(false);
				setHasInvalidYear(false);
				setYear(event.target.value);
				break;
			}

			case 'cvc': {
				setHasEmptyCvc(false);
				setHasInvalidCvc(false);
				setCvc(event.target.value);
				break;
			}
		}
	};

	const handleFormClean = () => {
		setName('');
		setCardNumber('');
		setMonth('');
		setYear('');
		setCvc('');
		setFormattedCardNumber('');

		setIsFormSubmitted(false);
	};

	return (
		<main className="App">
			<section className="App__card">
				<Card 
					formattedCardNumber={formattedCardNumber}
					name={name}
					month={month}
					year={year}
					cvc={cvc}
				/>
			</section>

			<section className="App__form">
				{isFormSubmitted ? (
					<Success handleFormClean={handleFormClean} />
				) : (
					<Form 
						handleSubmit={handleSubmit}
						name={name}
						hasEmptyName={hasEmptyName}
						emptyInputMessage={emptyInputMessage}
						wrongFormatMessage={wrongFormatMessage}
						cardNumber={cardNumber}
						hasEmptyCardNumber={hasEmptyCardNumber}
						hasInvalidCardNumber={hasInvalidCardNumber}
						month={month}
						hasEmptyMonth={hasEmptyMonth}
						hasInvalidMonth={hasInvalidMonth}
						year={year}
						hasEmptyYear={hasEmptyYear}
						hasInvalidYear={hasInvalidYear}
						cvc={cvc}
						hasEmptyCvc={hasEmptyCvc}
						hasInvalidCvc={hasInvalidCvc}
						handleInputChange={handleInputChange}
						MIN_CARD_LENGTH
					/>
				)}
			</section>
		</main>
	);
};