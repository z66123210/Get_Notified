import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

import apiClient from '../../../Services/AxiosClient';

const SubscriptionForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/account',
      },
    });

    if (error) {
      setErrorMessage(error.message || 'An unexpected error occurred.');
    } else {
      setErrorMessage(null);
    }

    setIsProcessing(false);
  };

  return (

    <>
    <h1>Subscribe</h1>

      <p>
        Try the successful test card: <span>4242424242424242</span>.
      </p>

      <p>
        Try the test card that requires SCA: <span>4000002500003155</span>.
      </p>

      <p>
        Use any <i>future</i> expiry date, CVC,5 digit postal code
      </p>

      <hr />

    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? 'Processing...' : 'Subscribe'}
      </button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </form>
    </>
  );
};

export default SubscriptionForm;
