import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe('YOUR_PUBLIC_STRIPE_KEY');