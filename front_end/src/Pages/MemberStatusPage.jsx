import React, { useState, useEffect } from 'react';
import apiClient from '../Services/AxiosClient';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper, CircularProgress, Alert } from '@mui/material';

const MemberStatusPage = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await apiClient.get('/api/billing/subscription', {
          withCredentials: true,
        });
        setSubscription(response.data);
      } catch (error) {
        setError(
          error.response?.data?.error || 'An error occurred while fetching subscription details.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  const handleCancelSubscription = async () => {
    try {
      await apiClient.post('/api/billing/cancel-subscription', { subscriptionId: subscription.id }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Subscription canceled successfully.');
      navigate('/dashboard');
    } catch (error) {
      setError(
        error.response?.data?.error || 'An error occurred while canceling the subscription.'
      );
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Subscription Status
        </Typography>

        {subscription && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="body1">
              <strong>Status:</strong> {subscription.status}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Next Billing Date:</strong> {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 4 }}
              onClick={handleCancelSubscription}
            >
              Cancel Subscription
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default MemberStatusPage;
