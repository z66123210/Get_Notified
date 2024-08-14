import axios from 'axios';
import { handleError } from '../Helpers/ErrorHandler';
import { SubscriptionCreateResponse } from '../Models/User';
// import * as error from 'console';

// Create an Axios instance with the base URL and port
const apiClient = axios.create({
    baseURL: "http://localhost:5167/", // Replace with your server's base URL and port
    withCredentials: true,
});

interface ConfigResponse {
  publishableKey: string;
}


export const apiCreateSubscription = async (priceid: string) => {
    try {
      const data = await apiClient.post<SubscriptionCreateResponse>("api/billing/create-subscription", {
        priceId: priceid
      });
      return data;
    } catch (error) {
      handleError(error);
    }
  };

  export  const apiGetPublishableKey= async () => {
    try {
      const response = await axios.get<ConfigResponse>('api/billing/config');
  
      const publishableKey = response.data.publishableKey;
  
  
      // Use the publishable key as needed
      return publishableKey;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        console.error('Axios error:', error.message);
      } else {
        // Handle other types of errors
        console.error('Unexpected error:', error);
      }
      return null;
    }
  }

// Export the Axios instance for use in other modules
export default apiClient;
