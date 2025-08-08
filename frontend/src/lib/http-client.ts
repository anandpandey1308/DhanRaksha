import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import Cookies from 'js-cookie';

// Create axios instance with base configuration
const httpClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
httpClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear auth token and redirect to login
      Cookies.remove('auth-token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default httpClient;