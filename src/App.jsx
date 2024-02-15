import { useState } from 'react';
import { Card } from './components/Card/Card';
import { Success } from './components/Success/Success';
import { Form } from './components/Form/Form';
import { 
  MIN_MONTH, 
  MAX_MONTH, 
  MIN_CARD_LENGTH, 
  numberRegex
} from './constants/constants';
import './App.scss';

const initialCard = {
  name: '',
  number: '',
  month: '',
  year: '',
  cvc: '',
};

const initialErrors = {
  name: {
    isEmpty: false,
  },
  number: {
    isEmpty: false,
    isInvalid: false,
  },
  month: {
    isEmpty: false,
    isInvalid: false,
  },
  year: {
    isEmpty: false,
    isInvalid: false,
  },
  cvc: {
    isEmpty: false,
    isInvalid: false,
  },
};

export const App = () => {
  const [card, setCard] = useState(initialCard);
  const [errors, setErrors] = useState(initialErrors);

  const [formattedNumber, setFormattedNumber] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); 

  const {
    name,
    number,
    month,
    year,
    cvc,
  } = card;

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

  const getFormattedNumber = (numbers) => {
    const arrayNumber = numbers.replace(/\s/g, "");
    const chunkSize = 4;

    const newNumbers = splitNumbers(arrayNumber, chunkSize);

    setFormattedNumber(newNumbers.join(' '));
  };

  const splitNumbers = (currentArray, chunkSize) => {
      return Array.from({ length: Math.ceil(currentArray.length / chunkSize) }, (_, index) =>
      currentArray.slice(index * chunkSize, index * chunkSize + chunkSize)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedNumber = number.trim();
    const trimmedMonth = month.trim();
    const trimmedYear = year.trim();
    const trimmedCvc = cvc.trim();

    const editedNumber = trimmedNumber.replaceAll(' ', '');

    const isNumberValid = isInputValid(editedNumber, 'number');
    const isMonthValid = isInputValid(trimmedMonth, 'month');
    const isYearValid = isInputValid(trimmedYear, 'year');
    const isCvcValid = isInputValid(trimmedCvc, 'cvc');

    setErrors({
      name: {
        isEmpty: !trimmedName,
      },
      number: {
        isEmpty: !trimmedNumber,
        isInvalid: !isNumberValid,
      },
      month: {
        isEmpty: !trimmedMonth,
        isInvalid: !isMonthValid,
      },
      year: {
        isEmpty: !trimmedYear,
        isInvalid: !isYearValid,
      },
      cvc: {
        isEmpty: !trimmedCvc,
        isInvalid: !isCvcValid,
      },
    })

    const hasEmptyInput = !trimmedName 
                        || !trimmedNumber 
                        || !trimmedMonth 
                        || !trimmedYear 
                        || !trimmedCvc;

    const hasInvalidInput = !isNumberValid 
                          || !isMonthValid 
                          || !isYearValid
                          || !isCvcValid;

    if ( hasEmptyInput || hasInvalidInput) {
      return;
    }

    setIsFormSubmitted(true);
  };

  const handleInputChange = (event) => {
    const { name: field, value } = event.target;

    setCard(current => ({ ...current, [field]: value }));
    setErrors(current => {
      if (name.isInvalid) {
        return {
          ...current,
          [field]: {
            isEmpty: false,
            isInvalid: false,
          } 
        }
      }

      return {
        ...current,
        [field]: {
          isEmpty: false,
        }
      }
    });

    if (field === 'number') {
      getFormattedNumber(value);
    }
  };

  const handleFormClean = () => {
    setCard(initialCard);
    setFormattedNumber('');
    setIsFormSubmitted(false);
  };

  return (
    <main className="App">
      <section className="App__card">
        <Card 
          formattedNumber={formattedNumber}
          card={card}
        />
      </section>

      <section className="App__form">
        {isFormSubmitted ? (
          <Success handleFormClean={handleFormClean} />
        ) : (
          <Form 
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            formattedNumber={formattedNumber}
            errors={errors}
            card={card}
          />
        )}
      </section>
    </main>
  );
};
