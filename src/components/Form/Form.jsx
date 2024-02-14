import className from 'classnames';
import './Form.scss';

export const Form = ({
	handleSubmit,
	name, 
	hasEmptyName,
	emptyInputMessage,
	wrongFormatMessage,
	cardNumber,
	hasEmptyCardNumber,
	hasInvalidCardNumber,
	month,
	hasEmptyMonth,
	hasInvalidMonth,
	year,
	hasEmptyYear,
	hasInvalidYear,
	cvc,
	hasEmptyCvc,
	hasInvalidCvc,
	handleInputChange,
	MIN_CARD_LENGTH,
}) => {
	const MAX_CARD_LENGTH = 16;
	const MAX_NAME_LENGTH = 30;
	const CVC_LENGTH = 3;
	const MMYYLength = 2;

	const namePlaceholder = 'e.g. Jane Appleseed';
	const cardNumberPlaceholder = 'e.g. 1234 5678 9123 0000';
	const MMPlaceholder = 'MM';
	const YYPlaceholder = 'YY';
	const CvcPlaceholder = 'e.g. 123';

	return (
		<form
			action="#"
			className="Form"
			onSubmit={handleSubmit}
		>
			<div className="Form__item">
				<label htmlFor="cardholderName" className="Form__label">
					Cardholder name
				</label>

				<input
					id="cardholderName"
					type="text"
					name="cardholderName"
					autoComplete="false"
					maxLength={MAX_NAME_LENGTH}
					placeholder={namePlaceholder}
					className={className('Form__input', {
						'Form__input--error': hasEmptyName,
					})}
					value={name}
					onChange={(event) => handleInputChange(event, 'name')}
				/>

				{hasEmptyName && (
					<p className="Form__error">{emptyInputMessage}</p>
				)}
			</div>

			<div className="Form__item">
				<label htmlFor="cardNumber" className="Form__label">Card number</label>
				<input
					id="cardNumber"
					type="text"
					name="cardNumber"
					minLength={MIN_CARD_LENGTH}
					maxLength={MAX_CARD_LENGTH}
					placeholder={cardNumberPlaceholder}
					className={className('Form__input', {
						'Form__input--error': hasEmptyCardNumber || hasInvalidCardNumber,
					})}
					value={cardNumber}
					onChange={(event) => handleInputChange(event, 'number')}
				/>
				{(hasEmptyCardNumber) && (
					<p className="Form__error">{emptyInputMessage}</p>
				)}
				{(hasInvalidCardNumber && !hasEmptyCardNumber) && (
					<p className="Form__error">{wrongFormatMessage}</p>
				)}
			</div>

			<div className="Form__date-cvc-container">
				<div className="Form__date-container">
					<label htmlFor="expDate" className="Form__label">Exp. Date (MM/YY)</label>
					<div id="expDate" className="Form__date">
						<input
							id="month"
							type="text"
							name="month"
							placeholder={MMPlaceholder}
							minLength={MMYYLength}
							maxLength={MMYYLength}
							className={className('Form__input Form__input--MMYY', {
								'Form__input--error': hasEmptyMonth || hasInvalidMonth,
							})}
							value={month}
							onChange={(event) => handleInputChange(event, 'month')}
						/>

						<input
							id="year"
							type="text"
							name="year"
							placeholder={YYPlaceholder}
							minLength={MMYYLength}
							maxLength={MMYYLength}
							className={className('Form__input Form__input--MMYY', {
								'Form__input--error': hasEmptyYear || hasInvalidYear,
							})}
							value={year}
							onChange={(event) => handleInputChange(event, 'year')}
						/>
					</div>
					{(hasEmptyMonth || hasEmptyYear) && (
						<p className="Form__error">{emptyInputMessage}</p>
					)}
					{(hasInvalidMonth || hasInvalidYear) && (!hasEmptyMonth && !hasEmptyYear) && (
						<p className="Form__error">{wrongFormatMessage}</p>
					)}
				</div>

				<div className="Form__cvc-container">
					<label htmlFor="cvc" className="Form__label">CVC</label>
					<input
						type="text"
						id="cvc"
						name="cvc"
						placeholder={CvcPlaceholder}
						minLength={CVC_LENGTH}
						maxLength={CVC_LENGTH}
						className={className('Form__input', {
							'Form__input--error': hasEmptyCvc || hasInvalidCvc,
						})}
						value={cvc}
						onChange={(event) => handleInputChange(event, 'cvc')}
					/>
					{hasEmptyCvc && (
						<p className="Form__error">{emptyInputMessage}</p>
					)}
					{hasInvalidCvc && !hasEmptyCvc && (
						<p className="Form__error">{wrongFormatMessage}</p>
					)}
				</div>
			</div>

			<button
				type="submit"
				className="Form__button"
			>
				Confirm
			</button>
		</form>
	);
};