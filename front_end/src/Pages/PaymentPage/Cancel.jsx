import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../Services/AxiosClient';


const Cancel = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);

  const handleClick = async (e) => {
    e.preventDefault();

    // await fetch('api/cancel-subscription', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     subscriptionId: locacion.state.subscription
    //   }),
    // })
    

  
      try {
        const response = await apiClient.post('/api/billing/cancel-subscription', {
          subscriptionId: location.state.subscription
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        // Handle the response as needed
        console.log('Subscription canceled successfully:', response.data);
      } catch (error) {
        console.error('Error canceling subscription:', error);
      }
 

    navigate('/account', { replace: true });
  };

  return (
    <div>
      <h1>Cancel</h1>
      <button onClick={handleClick}>Cancel</button>
    </div>
  )
}


export default Cancel;
