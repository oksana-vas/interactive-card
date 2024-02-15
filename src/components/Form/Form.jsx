import className from 'classnames';
import * as consts from '../../constants/constants';
import './Form.scss';

const {
  MAX_NAME_LENGTH,
  MIN_CARD_LENGTH,
  MAX_CARD_LENGTH,
  MMYY_LENGTH,
  CVC_LENGTH,
  namePlaceholder,
  cardNumberPlaceholder,
  MMPlaceholder,
  YYPlaceholder,
  CvcPlaceholder,
  emptyInputMessage,
  wrongFormatMessage,
  } = consts;

  export const Form = ({
  handleSubmit,
  handleInputChange,
  formattedNumber,
  card,
  errors
  }) => {
  const {
    name,
    number,
    month,
    year,
    cvc
  } = errors;

  return (
    <form
      action="#"
      className="Form"
      onSubmit={handleSubmit}
    >
      <div className="Form__item">
        <label htmlFor="name" className="Form__label">
          Cardholder name
        </label>

        <input
          id="name"
          type="text"
          name="name"
          autoComplete="false"
          maxLength={MAX_NAME_LENGTH}
          placeholder={namePlaceholder}
          className={className('Form__input', {
            'Form__input--error': name.isEmpty,
          })}
          value={card.name}
          onChange={handleInputChange}
        />

        {name.isEmpty && (
          <p className="Form__error">{emptyInputMessage}</p>
        )}
      </div>

      <div className="Form__item">
        <label htmlFor="number" className="Form__label">Card number</label>
        <input
          id="number"
          type="text"
          name="number"
          minLength={MIN_CARD_LENGTH}
          maxLength={MAX_CARD_LENGTH}
          placeholder={cardNumberPlaceholder}
          className={className('Form__input', {
            'Form__input--error': number.isEmpty || number.isInvalid,
          })}
          value={formattedNumber}
          onChange={handleInputChange}
        />
        {number.isEmpty && (
          <p className="Form__error">{emptyInputMessage}</p>
        )}
        {(number.isInvalid && !number.isEmpty) && (
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
              minLength={MMYY_LENGTH}
              maxLength={MMYY_LENGTH}
              className={className('Form__input Form__input--MMYY', {
                'Form__input--error': month.isEmpty || month.isInvalid,
              })}
              value={card.month}
              onChange={handleInputChange}
            />

            <input
              id="year"
              type="text"
              name="year"
              placeholder={YYPlaceholder}
              minLength={MMYY_LENGTH}
              maxLength={MMYY_LENGTH}
              className={className('Form__input Form__input--MMYY', {
                'Form__input--error': year.isEmpty || year.isInvalid,
              })}
              value={card.year}
              onChange={handleInputChange}
            />
          </div>
          {(year.isEmpty || month.isEmpty) && (
            <p className="Form__error">{emptyInputMessage}</p>
          )}
          {(month.isInvalid || year.isInvalid) && (!month.isEmpty && !year.isEmpty) && (
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
              'Form__input--error': cvc.isEmpty || cvc.isInvalid,
            })}
            value={card.cvc}
            onChange={handleInputChange}
          />
          {cvc.isEmpty && (
            <p className="Form__error">{emptyInputMessage}</p>
          )}
          {(cvc.isInvalid && !cvc.isEmpty) && (
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
