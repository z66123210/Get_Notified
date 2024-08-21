import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../Services/AxiosClient';


const Prices = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [prices, setPrices] = useState([]);

  // useEffect(() => {
  //   const fetchPrices = async () => {
  //     const {prices} = await fetch('api/subscription/config').then(r => r.json());
  //     setPrices(prices);
  //   };
  //   fetchPrices();
  // }, [])
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await apiClient.get('/api/billing/config', {
          withCredentials: true // Include credentials if necessary
        });
        setPrices(response.data.prices);
      } catch (error) {
        console.error('Error fetching prices:', error);
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
      console.error('Error creating subscription:', error);
    }
  };
  

  return (
    <div>
      <h1>Select a plan</h1>

      <div className="price-list">
        {prices.map((price) => {
          return (
            <div key={price.id}>
              <h3>{price.product.name}</h3>

              <p>
                ${price.unit_amount / 100} / month
              </p>

              <button onClick={() => createSubscription(price.id)}>
                Select
              </button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Prices;
