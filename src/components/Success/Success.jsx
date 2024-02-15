import './Success.scss';

export const Success = ({ handleFormClean }) => {
  return (
    <section className="Success">
      <span className="Success__icon"></span>

      <h1 className="Success__title">Thank you!</h1>

      <p className="Success__description">
        We've added your card details
      </p>

      <button 
        type="submit"
        className="Success__button"
        onClick={handleFormClean}
      >
        Continue
      </button>
    </section>
  );
};
