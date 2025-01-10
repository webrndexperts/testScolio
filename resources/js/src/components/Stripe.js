import React, { useEffect, useState } from 'react';
// import StripeCss from '../pages/PaymentPage.css'
import '../pages/PaymentPage.css'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
const API = process.env.REACT_APP_API_URL;

const Stripe = ({BillingSubmit,stripeEffectUpdate}) => {
  // const {totalQuantity,totalPrice,tax,subTotal,discountAmount,shippigCharges}=BillingSubmit;
  // console.log("subTotal==========",subTotal);
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState(null);
    // useEffect(()=>{
    //   handlePaymentSubmit();
    // },[stripeEffectUpdate])
  
    const handlePaymentSubmit = async (event) => {
      // event.preventDefault();
    
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
          // https://rndexperts.in/backend-laravel/api/v1/stripe-payment
          // http://localhost:3001/process-payment
          fetch(`${API}stripe-payment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token.id, amount: 100 }), // Replace 1000 with your desired amount
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
      </div>
    );
}

export default Stripe
