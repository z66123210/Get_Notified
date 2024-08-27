import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@mui/material';

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
        return_url: 'http://localhost:3000/complete',
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
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button type="submit" disabled={!stripe || isProcessing} variant="contained" color="primary">
            {isProcessing ? 'Processing...' : 'Subscribe'}
          </Button>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </>
  );
};

export default SubscriptionForm;
