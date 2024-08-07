import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";
import apiClient from "./AxiosClient";

// const api = "http://localhost:5167/api/";

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await apiClient.post<UserProfileToken>("api/account/login", {
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const data = await apiClient.post<UserProfileToken>("api/account/register", {

      email: email,
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const LogoutAPI = async () => {
  try {
    const response = await apiClient.get('api/account/logout');

    if (response.status === 200) {
      // Successfully logged out
      console.log('Logged out');
      // Redirect to login page or perform any other necessary actions
      window.location.href = '/login';
    } else {
      // Handle error
      console.error('Logout failed');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
