// PaymentPage.js

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { useNavigate } from 'react-router-dom';
import './PaymentPage.css'; // Import the CSS file
const PaymentPage = ({BillingSubmit}) => {
  // const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [paymentError, setPaymentError] = useState(null);

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    // let formData = BillingSubmit(data);
    if (!stripe) {
      console.log('Stripe.js has not yet loaded.');
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
  
    if (!cardElement) {
      console.log('CardElement not found.');
      return;
    }
  
    try {
      const { token, error } = await stripe.createToken(cardElement);
  
      if (error) {
        console.log('Error creating token:', error);
        setPaymentError(error.message);
      } else {
        // Send the token to your server
        fetch('http://localhost:3001/process-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: token.id, amount: 1000 }), // Replace 1000 with your desired amount
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the server response
            console.log('Server response:', data);
          })
          .catch((error) => {
            console.log('Error sending token to server:', error);
          });
      }
    } catch (error) {
      console.log('An error occurred:', error);
      setPaymentError('An error occurred during payment.');
    }
  };
  
  

  return (
    <div className="container-payment">
      <h2>Payment Page</h2>

      <form onSubmit={handlePaymentSubmit} className="payment-form">
        <label>
          Card details
          <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
          />
        </label>

        {paymentError && (
          <div className="alert alert-danger" role="alert">
            {paymentError}
          </div>
        )}

        <button type="submit" disabled={!stripe} className="pay-button">
          Pay
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
