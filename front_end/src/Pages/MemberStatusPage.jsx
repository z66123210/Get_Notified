import React, { useState, useEffect } from 'react';
import apiClient from '../Services/AxiosClient';
import { useNavigate } from 'react-router-dom';

const MemberStatusPage = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await apiClient.get('/api/billing/subscription', {
          withCredentials: true
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
      await apiClient.post('/api/billing/cancel-subscription', {subscriptionId:subscription.id}, {
        headers: {
          'Content-Type': 'application/json'
        }
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message" style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <h1>Subscription Status</h1>
      {subscription && (
        <div>
          <p>Status: {subscription.status}</p>
          <p>Next Billing Date: {new Date(subscription.current_period_end * 1000).toLocaleDateString()}</p>
          <button onClick={handleCancelSubscription}>Cancel Subscription</button>
        </div>
      )}
    </div>
  );
};

export default MemberStatusPage;
