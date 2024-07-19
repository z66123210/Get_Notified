import axios from 'axios';




// Create an Axios instance with the base URL and port
const apiClient = axios.create({
    baseURL: "http://localhost:5167/", // Replace with your server's base URL and port

});

// Export the Axios instance for use in other modules
export default apiClient;
