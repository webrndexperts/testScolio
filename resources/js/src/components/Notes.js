import React from 'react'
// import ApiHook from './CustomHooks/ApiHook'

const Notes = () => {
  return (
    <div>
      {/* let data = JSON.parse(localStorage.getItem('data')); */}
      {/* localStorage.setItem('data', JSON.stringify(data)); */}
      {/* import { Modal, ModalBody, Carousel, CarouselItem, CarouselControl } from 'reactstrap'; */}
      {/* import ReactPlayer from 'react-player'; */}
      {/* npm install bootstrap@5.3.2 popper.js@2.10.2 slick-carousel@1.8. */}
      {/* CurrencyConverter : https://api.exchangerate-api.com/v4/latest/${originalCurrency} */}
      {/* import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'; */}
      {/* npm i country-state-city */}
    </div>
  )
}

export default Notes


// Curency converter component to change the amount of SGD TO USD 4HR
// Navebar option creating and routing setup and logo adding
// single-order api implementation and looping and display data 

/**
 * 
   const BillingSubmit = async (data) => {
    // console.log("Billing Data ", data);
    // setStripeEffectUpdate(stripeEffectUpdate + 1)
    // billingReset();
    setStripeLoader(true);
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
      console.log("token======", token);
      if (error) {
        console.log('Error creating token:', error);
        setPaymentError(error.message);
        setStripeLoader(false);
      } else {
        setPaymentError(null);
        // Send the token to your server
        // https://rndexperts.in/backend-laravel/api/v1/stripe-payment
        // http://localhost:3001/process-payment
        fetch('https://rndexperts.in/backend-laravel/api/v1/stripe-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: token.id, amount: parseFloat(getTotal().subTotal.toFixed(2)) }), // Replace 1000 with your desired amount
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the server response
            if (data) {
              setStripeLoader(false);
            }
            console.log('Server response:', data);
          })
          .catch((error) => {
            console.log('Error sending token to server:', error);
            setStripeLoader(false);
          });
      }
    } catch (error) {
      console.log('An error occurred:', error);
      setStripeLoader(false);
      setPaymentError('An error occurred during payment.');
    }
  }
 */