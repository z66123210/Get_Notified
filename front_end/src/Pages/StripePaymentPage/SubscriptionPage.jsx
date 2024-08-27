import React from 'react';
import SubscriptionForm from './Components/SubscriptionForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Paper } from '@mui/material';

const stripePromise = loadStripe('pk_test_51PfIaVRsnoHgmWyZ2OGnGN9NPsvTErJ9E5I7FFz6Vt3XI5YopB4fhcAnvXt8BQoxYcWuzlQHoz4wxCxFeGqfgG5l00jXgu05Ss');

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const data = useLocation();

  if (!data.state) {
    navigate('/prices');
  }

  const clientSecret = data.state?.clientSecret;

  const options = {
    clientSecret: clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3 }}>
            Subscribe to Our Service
          </Typography>
          
          {clientSecret ? (
            <SubscriptionForm clientSecret={clientSecret} />
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <CircularProgress />
            </Box>
          )}
        </Paper>
      </Container>
    </Elements>
  );
};

export default SubscriptionPage;
