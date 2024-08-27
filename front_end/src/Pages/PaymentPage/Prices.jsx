import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../Services/AxiosClient';
import DashBoardButton from '../../Components/DashBoardButton';
import { Box, Container, Typography, Grid, Card, CardContent, CardActions, Button, Alert } from '@mui/material';

const Prices = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [prices, setPrices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await apiClient.get('/api/billing/config', {
          withCredentials: true // Include credentials if necessary
        });
        setPrices(response.data.prices);
      } catch (error) {
        setError(
          error.response?.data?.error || 'An error occurred while fetching prices.'
        );
      }
    };

    fetchPrices();
  }, []);

  const createSubscription = async (priceId) => {
    try {
      const response = await apiClient.post('/api/billing/create-subscription', {
        priceId
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const { subscriptionId, clientSecret } = response.data;
  
      navigate('/subscribe', {
        state: {
          from: location,
          subscriptionId,
          clientSecret,
        },
        replace: false
      });
    } catch (error) {
      setError(
        error.response?.data?.error || 'An error occurred while creating the subscription.'
      );
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Select a Plan
      </Typography>

      {/* Display error message if one exists */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4} justifyContent="space-between" sx={{ mt: 4 }}>
        {prices.map((price, index) => (
          <Grid item xs={12} sm={6} key={price.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {price.product.name}
                </Typography>
                <Typography variant="h5" color="textSecondary">
                  ${price.unit_amount / 100} / {index === 0 ? 'month' : 'year'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  onClick={() => createSubscription(price.id)}
                >
                  Select
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
  <DashBoardButton />
</Box>
    </Container>
  );
};

export default Prices;
