import React, { useEffect, useState } from 'react';
import SubscriptionForm from './Components/SubscriptionForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import apiClient from '../../Services/AxiosClient';
import { useLocation, useNavigate } from 'react-router-dom';




const stripePromise = loadStripe('pk_test_51PfIaVRsnoHgmWyZ2OGnGN9NPsvTErJ9E5I7FFz6Vt3XI5YopB4fhcAnvXt8BQoxYcWuzlQHoz4wxCxFeGqfgG5l00jXgu05Ss');

const SubscriptionPage = () => {
 

  const navigate = useNavigate();
  // const {
  //   state: {
  //     clientSecret,
  //   }
  // } = useLocation();

  const data = useLocation();

  if (data.state == null)
  {
    navigate('/prices');
  }
  const clientSecret = data.state.clientSecret;

  const options = {
    // passing the client secret obtained from the server
    clientSecret: clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <div className="subscription-page">
        <h1>Subscribe to Our Service</h1>
        {clientSecret ? (
          <SubscriptionForm clientSecret={clientSecret} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </Elements>
  );
};

export default SubscriptionPage;
