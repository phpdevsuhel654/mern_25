import { useEffect, useState } from 'react';
import { createOrder, createPaymentIntent } from '../api/orderApi';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../utils/stripe';
import StripePayment from '../components/StripePayment';

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState('');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const initCheckout = async () => {
      const shipping = JSON.parse(localStorage.getItem('shipping'));

      // 1️⃣ Create Order
      const orderRes = await createOrder({
        shippingAddress: shipping,
        paymentMethod: 'STRIPE',
      });

      setOrderId(orderRes.data._id);

      // 2️⃣ Create Payment Intent
      const paymentRes = await createPaymentIntent(orderRes.data._id);

      setClientSecret(paymentRes.data.clientSecret);
    };

    initCheckout();
  }, []);

  return (
    <div>
      <h2>Checkout</h2>

      {clientSecret ? (
        <p>Ready for Stripe Payment</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Checkout;