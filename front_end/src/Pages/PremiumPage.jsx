// src/components/PremiumPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Prices from './PaymentPage/Prices';
import MemberStatusPage from './MemberStatusPage';
import apiClient from '../Services/AxiosClient';


const isUserSubscribed = async () => {
  try {
    const response = await apiClient.get('/api/subscription/status');
    return response.data.isActive;
  } catch (error) {
    console.error('Failed to fetch subscription status:', error);
    return false;
  }
};

export default function PremiumPage() {
  const [isSubscribed, setIsSubscribed] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSubscription = async () => {
      const subscribed = await isUserSubscribed();
      setIsSubscribed(subscribed);
    };

    checkSubscription();
  }, []);

  if (isSubscribed === null) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or similar UI
  }

  return (isSubscribed ? <MemberStatusPage/> : <Prices />);
}
