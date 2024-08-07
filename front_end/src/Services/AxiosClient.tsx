import axios from 'axios';
import { handleError } from '../Helpers/ErrorHandler';
import { SubscriptionCreateResponse } from '../Models/User';


// Create an Axios instance with the base URL and port
const apiClient = axios.create({
    baseURL: "http://localhost:5167/", // Replace with your server's base URL and port
    withCredentials: true,
});



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

// Export the Axios instance for use in other modules
export default apiClient;
