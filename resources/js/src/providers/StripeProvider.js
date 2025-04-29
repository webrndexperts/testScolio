import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Replace 'your_publishable_key' with your actual publishable key
// const stripePromise = loadStripe(stripeDev);
// const stripePromise = loadStripe(stripeLive);

const mode = process.env.REACT_APP_PAYMENT_MODE;
let key = process.env.REACT_APP_STRIPE_LIVE;
if (mode === 'test'){
  key = process.env.REACT_APP_STRIPE_DEV
}
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_DEV)
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_LIVE)
const stripePromise = loadStripe(key)

const StripeProvider = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
