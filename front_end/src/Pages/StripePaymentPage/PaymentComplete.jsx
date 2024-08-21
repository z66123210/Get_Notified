import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';



// Load your publishable key
const stripePromise = loadStripe('pk_test_51PfIaVRsnoHgmWyZ2OGnGN9NPsvTErJ9E5I7FFz6Vt3XI5YopB4fhcAnvXt8BQoxYcWuzlQHoz4wxCxFeGqfgG5l00jXgu05Ss');

const PaymentComplete = () => {
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(3); // Start with 3 seconds
  const navigate = useNavigate();


  useEffect(() => {
    const checkPaymentIntentStatus = async () => {
      const stripe = await stripePromise;

      // Retrieve the "payment_intent_client_secret" query parameter
      const clientSecret = new URLSearchParams(window.location.search).get(
        'payment_intent_client_secret'
      );

      if (!clientSecret || !stripe) {
        setMessage('Invalid payment information.');
        return;
      }

      // Retrieve the PaymentIntent
      const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

      // Inspect the PaymentIntent `status` to indicate the status of the payment
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Success! Payment received.');
          const countdownInterval = setInterval(() => {
            setCountdown(prevCountdown => {
              if (prevCountdown <= 1) {
                clearInterval(countdownInterval);
                navigate('/dashboard'); // Redirect after countdown ends
              }
              return prevCountdown - 1;
            });
          }, 1000);
          break;
        case 'processing':
          setMessage("Payment processing. We'll update you when payment is received.");
          break;
        case 'requires_payment_method':
          setMessage('Payment failed. Please try another payment method.');
          // You might want to redirect the user back to your payment page here
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    };

    checkPaymentIntentStatus();
  }, []);

  return (

    <>
    <div id="message">{message}</div>;
    <div>Redirecting in {countdown} secondes..</div>
    
    </>

  );
 
  
};

export default PaymentComplete;

