import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';


const StripePayment = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const card = elements.getElement(CardElement);

	const navigate = useNavigate();

    await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
      },
    });

    alert('Payment Successful!');
	navigate('/success');
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit">Pay Now</button>
    </form>
  );
};

export default StripePayment;