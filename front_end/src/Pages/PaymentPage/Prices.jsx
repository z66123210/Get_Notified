import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../Services/AxiosClient';
import DashBoardButton from '../../Components/DashBoardButton';

const Prices = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [prices, setPrices] = useState([]);
  const [error, setError] = useState(null); // State to handle error messages

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await apiClient.get('/api/billing/config', {
          withCredentials: true // Include credentials if necessary
        });
        setPrices(response.data.prices);
      } catch (error) {
        // Set error message from server or a generic message
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
      // Set error message from server or a generic message
      setError(
        error.response?.data?.error || 'An error occurred while creating the subscription.'
      );
    }
  };
  
  return (
    <div>
      <h1>Select a plan</h1>

      {/* Display error message if one exists */}
      {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}

      <div className="price-list">
        {prices.map((price,index) => {
          return (
            <div key={price.id}>
              <h3>{price.product.name}</h3>

              <p>
              ${price.unit_amount / 100} / {index === 0 ? 'month' : 'year'}
              </p>

              <button onClick={() => createSubscription(price.id)}>
                Select
              </button>
              
            </div>
          )
        })}
      </div>
      < DashBoardButton/>

    </div>
  );
}

export default Prices;
